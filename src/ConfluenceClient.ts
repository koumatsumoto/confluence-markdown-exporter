interface ConfluencePageApiResponse<T extends BodyFormat> {
  id: string;
  title: string;
  body: {
    [K in T]: {
      value: string;
      representation: string;
    };
  };
  // Add other response fields as needed
}

type BodyFormat =
  | "storage"
  | "atlas_doc_format"
  | "view"
  | "export_view"
  | "anonymous_export_view"
  | "styled_view"
  | "editor";

export class ConfluenceClient {
  private readonly baseUrl: string;
  private readonly authHeader: string;

  constructor(config: { baseUrl: string; email: string; apiToken: string }) {
    // e.g. https://domain.atlassian.net/wiki/api/v2
    this.baseUrl = config.baseUrl;
    this.authHeader = createAuthHeader(config.email, config.apiToken);
  }

  async getPage<T extends BodyFormat = "view">(
    pageId: string,
    bodyFormat: T = "view" as T,
  ): Promise<ConfluencePageApiResponse<T>> {
    const url = `${this.baseUrl}/pages/${pageId}?body-format=${bodyFormat}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: this.authHeader,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch page: ${response.status} ${response.statusText}`,
      );
    }

    const page = (await response.json()) as ConfluencePageApiResponse<
      typeof bodyFormat
    >;

    return page;
  }
}

function createAuthHeader(email: string, apiToken: string) {
  return `Basic ${Buffer.from(`${email}:${apiToken}`).toString("base64")}`;
}
