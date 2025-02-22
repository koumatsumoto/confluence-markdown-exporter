import TurndownService from "turndown";
// @ts-ignore
import turndownPluginGfm from "turndown-plugin-gfm";

const turndownService = new TurndownService();
turndownService.use(turndownPluginGfm.gfm);

export function convertHtmlToMarkdown(html: string): string {
  const markdown = turndownService.turndown(html);

  return markdown;
}
