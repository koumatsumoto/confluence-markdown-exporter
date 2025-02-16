import { main } from "./main";

describe("main", () => {
  test("main should execute without errors", async () => {
    await expect(main()).resolves.not.toThrow();
  });
});
