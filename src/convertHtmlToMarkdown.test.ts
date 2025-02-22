import { describe, it, expect } from "vitest";
import { convertHtmlToMarkdown } from "./convertHtmlToMarkdown";

describe("convertHtmlToMarkdown", () => {
  it("should convert basic text", () => {
    const html = "<p>Hello World</p>";
    const expected = "Hello World";
    expect(convertHtmlToMarkdown(html)).toBe(expected);
  });

  it("should convert headers", () => {
    const html = `
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
    `;
    const expected = "# Header 1\n\n## Header 2\n\n### Header 3";
    expect(convertHtmlToMarkdown(html).trim()).toBe(expected);
  });

  it("should convert links", () => {
    const html = '<a href="https://example.com">Example Link</a>';
    const expected = "[Example Link](https://example.com)";
    expect(convertHtmlToMarkdown(html)).toBe(expected);
  });

  it("should convert unordered lists", () => {
    const html = `
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    `;
    const expected = "*   Item 1\n*   Item 2\n*   Item 3";
    expect(convertHtmlToMarkdown(html).trim()).toBe(expected);
  });

  it("should convert ordered lists", () => {
    const html = `
      <ol>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </ol>
    `;
    const expected = "1.  First\n2.  Second\n3.  Third";
    expect(convertHtmlToMarkdown(html).trim()).toBe(expected);
  });

  it("should convert code blocks", () => {
    const html = '<pre><code>const x = "hello";\nconsole.log(x);</code></pre>';
    const expected = '```\nconst x = "hello";\nconsole.log(x);\n```';
    expect(convertHtmlToMarkdown(html)).toBe(expected);
  });

  it("should convert inline code", () => {
    const html = "Use the <code>console.log()</code> function";
    const expected = "Use the `console.log()` function";
    expect(convertHtmlToMarkdown(html)).toBe(expected);
  });

  it("should handle nested elements", () => {
    const html = `
      <div>
        <h1>Title</h1>
        <p>This is a <strong>bold</strong> and <em>italic</em> text with a <a href="https://example.com">link</a>.</p>
      </div>
    `;
    const expected =
      "# Title\n\nThis is a **bold** and _italic_ text with a [link](https://example.com).";
    expect(convertHtmlToMarkdown(html).trim()).toBe(expected);
  });
});
