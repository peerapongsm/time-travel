import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("build shell", () => {
  it("provides the application root, module entry, and shared analytics id", async () => {
    const html = await readFile(resolve("index.html"), "utf8");

    expect(html).toContain('id="app"');
    expect(html).toContain('src="/src/main.ts"');
    expect(html).toContain("3f09453d-0b39-443e-8845-5e65611cc58a");
  });
});
