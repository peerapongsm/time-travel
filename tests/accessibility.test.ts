import { beforeEach, describe, expect, it } from "vitest";
import { renderApp } from "../src/ui/app";

describe("accessible course navigation", () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    document.body.replaceChildren();
    window.history.replaceState({}, "", "/");
    root = document.createElement("div");
    document.body.append(root);
    renderApp(root);
  });

  it("keeps one page heading and labels every atlas filter", () => {
    expect(root.querySelectorAll("h1")).toHaveLength(1);
    root.querySelector<HTMLButtonElement>("button[data-view='atlas']")!.click();
    expect(root.querySelectorAll("h1")).toHaveLength(1);
    root.querySelectorAll<HTMLSelectElement>(".atlas select").forEach((select) => {
      expect(root.querySelector(`label[for='${select.id}']`)).not.toBeNull();
    });
    root.querySelector<HTMLButtonElement>("button[data-view='methodology']")!.click();
    expect(root.querySelectorAll("h1")).toHaveLength(1);
    expect(root.textContent).toMatch(/astronomical|no civil year zero|closed-timeline|era-relative|source hierarchy|numeric payoff|gambling|excludes|2026/i);
  });

  it("uses inline navigation, live announcements, safe links, and non-color-only status", () => {
    expect(root.querySelector("[role='dialog']")).toBeNull();
    expect(root.querySelector("nav[aria-label='Course navigation'] button[data-view='methodology']")).not.toBeNull();
    expect(root.querySelector("[role='status'][aria-live='polite']")).not.toBeNull();

    root.querySelector<HTMLButtonElement>("button[data-view='atlas']")!.click();
    expect(root.querySelector(".atlas-status[role='status'][aria-live='polite']")).not.toBeNull();
    expect(root.querySelectorAll("[style]")).toHaveLength(0);

    window.history.replaceState({}, "", "/?year=2016&era=CE&briefing=diversified-index-2016-briefing");
    renderApp(root);
    const links = root.querySelectorAll<HTMLAnchorElement>("a[target='_blank']");
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
    });
  });
});
