import { describe, expect, it } from "vitest";
import {
  buildDesignTokensFromProject,
  designTokensToCssVars,
  renderDesignTokensCss,
} from "./build.js";
import {
  DEFAULT_MOTION,
  buildProjectDesignTokensJson,
  mergeMotionTokens,
  normalizeProjectDesignTokensJson,
} from "./schema.js";

describe("motion tokens schema", () => {
  it("seeds canonical Majico defaults on new projects", () => {
    const tokens = buildProjectDesignTokensJson({});
    expect(tokens.light.motion).toEqual(DEFAULT_MOTION);
    expect(tokens.dark.motion).toEqual(DEFAULT_MOTION);
    expect(DEFAULT_MOTION.easingStandard).toBe(
      "cubic-bezier(0.22, 1, 0.36, 1)"
    );
    expect(DEFAULT_MOTION.easingExpressive).toBe(
      "cubic-bezier(0.16, 1, 0.3, 1)"
    );
    expect(DEFAULT_MOTION.durationChoreography).toBe("2800ms");
    expect(DEFAULT_MOTION.staggerStream).toBe("280ms");
    expect(DEFAULT_MOTION.holdReadable).toBe("1200ms");
  });

  it("merges partial motion objects for backward compatibility", () => {
    const merged = mergeMotionTokens({
      durationFast: "180ms",
      easingStandard: "ease-out",
    });
    expect(merged.durationFast).toBe("180ms");
    expect(merged.easingStandard).toBe("ease-out");
    expect(merged.durationChoreography).toBe(
      DEFAULT_MOTION.durationChoreography
    );
    expect(merged.holdReadable).toBe(DEFAULT_MOTION.holdReadable);
  });

  it("normalizes stored tokens with legacy motion shapes", () => {
    const legacy = buildProjectDesignTokensJson({});
    legacy.light.motion = {
      durationFast: "120ms",
      durationNormal: "200ms",
      easingStandard: "cubic-bezier(0.4, 0, 0.2, 1)",
    } as typeof legacy.light.motion;

    const normalized = normalizeProjectDesignTokensJson(legacy);
    expect(normalized.light.motion.durationFast).toBe("120ms");
    expect(normalized.light.motion.durationNormal).toBe("200ms");
    expect(normalized.light.motion.durationChoreography).toBe(
      DEFAULT_MOTION.durationChoreography
    );
  });
});

describe("motion tokens CSS export", () => {
  const MOTION_VAR_KEYS = [
    "--ds-motion-duration-instant",
    "--ds-motion-duration-micro",
    "--ds-motion-duration-fast",
    "--ds-motion-duration-normal",
    "--ds-motion-duration-emphasis",
    "--ds-motion-duration-choreography",
    "--ds-motion-ease-standard",
    "--ds-motion-ease-expressive",
    "--ds-motion-stagger-sibling",
    "--ds-motion-stagger-stream",
    "--ds-motion-hold-readable",
  ] as const;

  const ELEVATION_VAR_KEYS = [
    "--ds-shadow-sm",
    "--ds-shadow-md",
    "--ds-shadow-lg",
  ] as const;

  it("includes motion and elevation vars in designTokensToCssVars", () => {
    const tokens = buildDesignTokensFromProject({});
    const vars = designTokensToCssVars(tokens, "light");

    for (const key of MOTION_VAR_KEYS) {
      expect(vars[key]).toBeTruthy();
    }
    for (const key of ELEVATION_VAR_KEYS) {
      expect(vars[key]).toBeTruthy();
    }

    expect(vars["--ds-motion-duration-fast"]).toBe(DEFAULT_MOTION.durationFast);
    expect(vars["--ds-motion-ease-expressive"]).toBe(
      DEFAULT_MOTION.easingExpressive
    );
    expect(vars["--ds-shadow-sm"]).toBe(tokens.light.elevation.sm);
  });

  it("emits motion and elevation vars in renderDesignTokensCss", () => {
    const css = renderDesignTokensCss(buildDesignTokensFromProject({}));
    for (const key of [...MOTION_VAR_KEYS, ...ELEVATION_VAR_KEYS]) {
      expect(css).toContain(`${key}:`);
    }
  });
});
