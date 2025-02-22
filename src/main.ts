import { ConfluenceClient } from "./ConfluenceClient.ts";
import { parseEnv } from "./parseEnv.ts";
import { saveTextFile } from "./fileUtils.ts";
import { convertHtmlToMarkdown } from "./convertHtmlToMarkdown.ts";

export async function main(params: Record<string, string | undefined>) {
  const env = parseEnv(params);

  const client = new ConfluenceClient({
    baseUrl: env.CONFLUENCE_BASE_URL,
    email: env.CONFLUENCE_EMAIL,
    apiToken: env.CONFLUENCE_API_TOKEN,
  });

  const pageId = env.DEFAULT_PAGE_ID;
  const page = await client.getPage(pageId);
  const html = page.body.view.value;
  await saveTextFile(`${env.EXPORT_DIR}/page.html`, html);

  const markdown = convertHtmlToMarkdown(html);
  await saveTextFile(`${env.EXPORT_DIR}/page.md`, markdown);

  return page;
}
