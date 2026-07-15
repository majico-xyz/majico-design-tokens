import type { ProjectDesignTokensJson } from "./schema.js";
import { buildProjectDesignTokensJson } from "./schema.js";

export type { ProjectDesignTokensJson };

export function buildDesignTokensFromProject(
  project: Record<string, unknown>
): ProjectDesignTokensJson {
  return buildProjectDesignTokensJson({
    primaryArchetype:
      typeof project.primary_archetype === "string"
        ? project.primary_archetype
        : null,
    headingFont:
      typeof project.heading_font === "string" ? project.heading_font : null,
    bodyFont: typeof project.body_font === "string" ? project.body_font : null,
    paletteTokens:
      (project.palette_tokens as {
        light?: Record<string, string>;
        dark?: Record<string, string>;
      } | null) ?? null,
  });
}

/** Flatten design tokens to CSS custom property map (light theme). */
export function designTokensToCssVars(
  tokens: ProjectDesignTokensJson,
  theme: "light" | "dark" = "light"
): Record<string, string> {
  const t = tokens[theme];
  return {
    "--ds-bg": t.color.bg,
    "--ds-bg-muted": t.color.bgMuted,
    "--ds-text": t.color.text,
    "--ds-text-muted": t.color.textMuted,
    "--ds-accent": t.color.accent,
    "--ds-accent-on": t.color.accentOn,
    "--ds-border": t.color.border,
    "--ds-radius-md": t.radius.md,
    "--ds-space-md": t.spacing.md,
    "--ds-shadow-sm": t.elevation.sm,
    "--ds-shadow-md": t.elevation.md,
    "--ds-shadow-lg": t.elevation.lg,
    "--ds-font-body-size": t.typography.body,
    "--ds-motion-duration-instant": t.motion.durationInstant,
    "--ds-motion-duration-micro": t.motion.durationMicro,
    "--ds-motion-duration-fast": t.motion.durationFast,
    "--ds-motion-duration-normal": t.motion.durationNormal,
    "--ds-motion-duration-emphasis": t.motion.durationEmphasis,
    "--ds-motion-duration-choreography": t.motion.durationChoreography,
    "--ds-motion-ease-standard": t.motion.easingStandard,
    "--ds-motion-ease-expressive": t.motion.easingExpressive,
    "--ds-motion-stagger-sibling": t.motion.staggerSibling,
    "--ds-motion-stagger-stream": t.motion.staggerStream,
    "--ds-motion-hold-readable": t.motion.holdReadable,
  };
}

export function renderDesignTokensCss(tokens: ProjectDesignTokensJson): string {
  const light = designTokensToCssVars(tokens, "light");
  const dark = designTokensToCssVars(tokens, "dark");
  const lines: string[] = [":root {"];
  for (const [key, value] of Object.entries(light)) {
    lines.push(`  ${key}: ${value};`);
  }
  lines.push("}", "", "@media (prefers-color-scheme: dark) {", "  :root {");
  for (const [key, value] of Object.entries(dark)) {
    lines.push(`    ${key}: ${value};`);
  }
  lines.push("  }", "}");
  return lines.join("\n");
}
