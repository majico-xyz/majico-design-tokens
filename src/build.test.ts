import { describe, expect, it } from "vitest";
import {
  buildDesignTokensFromProject,
  designTokensToCssVars,
  renderDesignTokensCss,
} from "./build.js";

describe("design-tokens build", () => {
  it("buildDesignTokensFromProject maps project fields", () => {
    const tokens = buildDesignTokensFromProject({
      primary_archetype: "sage",
      heading_font: "Inter",
      body_font: "Roboto",
      palette_tokens: {
        light: { accent: "#603bff", bg: "#fff" },
        dark: { accent: "#8b74ff", bg: "#000" },
      },
    });
    expect(tokens.light.color.accent).toBeTruthy();
    expect(tokens.dark.color.accent).toBeTruthy();
  });

  it("designTokensToCssVars flattens light and dark themes", () => {
    const tokens = buildDesignTokensFromProject({});
    const light = designTokensToCssVars(tokens, "light");
    const dark = designTokensToCssVars(tokens, "dark");
    expect(light["--ds-bg"]).toBeTruthy();
    expect(dark["--ds-bg"]).toBeTruthy();
    expect(light["--ds-font-body-size"]).toBeTruthy();
  });

  it("renderDesignTokensCss emits root and dark media rules", () => {
    const css = renderDesignTokensCss(buildDesignTokensFromProject({}));
    expect(css).toContain(":root {");
    expect(css).toContain("@media (prefers-color-scheme: dark)");
    expect(css).toContain("--ds-bg:");
  });
});
