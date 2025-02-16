import { describe, expect, it } from "vitest";
import { parseEnv } from "./parseEnv";

describe("parseEnv", () => {
  it("should parse valid environment variables", () => {
    const validEnv = {
      CONFLUENCE_BASE_URL: "https://example.atlassian.net",
      CONFLUENCE_EMAIL: "test@example.com",
      CONFLUENCE_API_TOKEN: "secret-token",
      DEFAULT_PAGE_ID: "123456",
      EXPORT_DIR: "./export",
    };

    expect(() => parseEnv(validEnv)).not.toThrow();
    const parsed = parseEnv(validEnv);
    expect(parsed).toEqual(validEnv);
  });

  it("should throw error for invalid URL", () => {
    const invalidEnv = {
      CONFLUENCE_BASE_URL: "not-a-url",
      CONFLUENCE_EMAIL: "test@example.com",
      CONFLUENCE_API_TOKEN: "secret-token",
      DEFAULT_PAGE_ID: "123456",
      EXPORT_DIR: "./export",
    };

    expect(() => parseEnv(invalidEnv)).toThrow();
  });

  it("should throw error for invalid email", () => {
    const invalidEnv = {
      CONFLUENCE_BASE_URL: "https://example.atlassian.net",
      CONFLUENCE_EMAIL: "not-an-email",
      CONFLUENCE_API_TOKEN: "secret-token",
      DEFAULT_PAGE_ID: "123456",
      EXPORT_DIR: "./export",
    };

    expect(() => parseEnv(invalidEnv)).toThrow();
  });

  it("should throw error for missing required fields", () => {
    const incompleteEnv = {
      CONFLUENCE_BASE_URL: "https://example.atlassian.net",
      CONFLUENCE_EMAIL: "test@example.com",
    };

    expect(() => parseEnv(incompleteEnv)).toThrow();
  });
});
