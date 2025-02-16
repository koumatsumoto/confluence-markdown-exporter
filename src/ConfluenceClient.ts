interface ConfluencePageResponse {
  id: string;
  title: string;
  body: {
    storage: {
      value: string;
      representation: string;
    };
  };
  // Add other response fields as needed
}

export class ConfluenceClient {
  private readonly baseUrl: string;
  private readonly authHeader: string;

  constructor(config: { baseUrl: string; email: string; apiToken: string }) {
    this.baseUrl = config.baseUrl;
    this.authHeader = createAuthHeader(config.email, config.apiToken);
  }

  async getPage(pageId: string): Promise<ConfluencePageResponse> {
    const url = `${this.baseUrl}/pages/${pageId}?body-format=storage`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: this.authHeader,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch page: ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<ConfluencePageResponse>;
  }
}

function createAuthHeader(email: string, apiToken: string) {
  return `Basic ${Buffer.from(`${email}:${apiToken}`).toString("base64")}`;
}
