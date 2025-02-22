import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { main } from "./main";
import { vi } from "vitest";
import * as fileUtils from "./fileUtils";

vi.mock("./fileUtils", () => ({
  saveTextFile: vi.fn().mockResolvedValue(undefined),
}));

const params = {
  CONFLUENCE_BASE_URL: "https://test.atlassian.net/wiki/api/v2",
  CONFLUENCE_EMAIL: "email@exapmle.com",
  CONFLUENCE_API_TOKEN: "secret-token",
  DEFAULT_PAGE_ID: "123",
  EXPORT_DIR: "./export",
};

const page = {
  id: "123",
  title: "page title",
  body: {
    view: {
      representation: "view",
      value: "<h1>Title</h1><p>This is a paragraph</p>",
    },
  },
};

export const restHandlers = [
  http.get(
    `${params.CONFLUENCE_BASE_URL}/pages/${params.DEFAULT_PAGE_ID}`,
    () => {
      return HttpResponse.json(page);
    }
  ),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());

describe("main", () => {
  test("main should execute without errors", async () => {
    await expect(main(params)).resolves.not.toThrow();
    expect(fileUtils.saveTextFile).toHaveBeenCalledTimes(2);
    expect(fileUtils.saveTextFile).toHaveBeenCalledWith(
      `${params.EXPORT_DIR}/page.html`,
      page.body.view.value
    );
    expect(fileUtils.saveTextFile).toHaveBeenCalledWith(
      `${params.EXPORT_DIR}/page.md`,
      "# Title\n\nThis is a paragraph"
    );
  });
});
