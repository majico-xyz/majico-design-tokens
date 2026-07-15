import { describe, expect, it } from "vitest";
import {
  buildProjectDesignTokensJson,
  validateProjectDesignTokensJson,
} from "./schema.js";

describe("design-tokens schema", () => {
  it("builds light/dark tokens from palette", () => {
    const tokens = buildProjectDesignTokensJson({
      primaryArchetype: "creator",
      headingFont: "Poppins",
      bodyFont: "Geist",
      paletteTokens: {
        light: {
          bg: "#fff8f2",
          bgMuted: "#fff0e6",
          text: "#1c1c1c",
          textMuted: "#525252",
          accent: "#ff7800",
          accentOn: "#1c1c1c",
          accentMuted: "#fab578",
          border: "#ffd0a7",
        },
      },
    });
    expect(validateProjectDesignTokensJson(tokens)).toBe(true);
    expect(tokens.light.spacing["2xl"]).toBe("72px");
    expect(tokens.light.radius.lg).toBe("24px");
    expect(tokens.meta?.headingFont).toBe("Poppins");
  });

  it("rejects invalid payload", () => {
    expect(validateProjectDesignTokensJson(null)).toBe(false);
    expect(validateProjectDesignTokensJson({ version: 2 })).toBe(false);
  });
});
