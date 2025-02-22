import TurndownService from "turndown";
// @ts-ignore
import turndownPluginGfm from "turndown-plugin-gfm";

const turndownService = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "*",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
  strongDelimiter: "**",
});

turndownService.use(turndownPluginGfm.gfm);

// Configure code block rendering
turndownService.addRule("codeBlock", {
  filter: ["pre"],
  replacement: function (content: string, node: any) {
    const code =
      node.firstChild && node.firstChild.tagName === "CODE"
        ? node.firstChild.textContent
        : node.textContent;
    return "\n```\n" + code + "\n```\n";
  },
});

export function convertHtmlToMarkdown(html: string): string {
  const markdown = turndownService.turndown(html);

  return markdown;
}
