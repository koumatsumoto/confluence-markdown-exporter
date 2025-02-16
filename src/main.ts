import { ConfluenceClient } from "./ConfluenceClient.ts";
import { parseEnv } from "./parseEnv.ts";

export async function main(params: Record<string, string | undefined>) {
  const env = parseEnv(params);

  const client = new ConfluenceClient({
    baseUrl: env.CONFLUENCE_BASE_URL,
    email: env.CONFLUENCE_EMAIL,
    apiToken: env.CONFLUENCE_API_TOKEN,
  });

  const pageId = env.DEFAULT_PAGE_ID;
  const page = await client.getPage(pageId);
  console.log(page);
  const body = page.body.storage.value;
  console.log("body", body);

  return page;
}
