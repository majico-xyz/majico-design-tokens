import type { ArchetypeId } from "@majico-xyz/data";

/** Semantic color roles aligned with palette_tokens / ThemeTokens. */
export type DesignColorTokens = {
  bg: string;
  bgMuted: string;
  text: string;
  textMuted: string;
  accent: string;
  accentOn: string;
  accentMuted: string;
  accent2?: string;
  accent3?: string;
  border: string;
};

export type DesignSpacingScale = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export type DesignRadiusScale = {
  sm: string;
  md: string;
  lg: string;
  full: string;
};

export type DesignElevationScale = {
  sm: string;
  md: string;
  lg: string;
};

export type DesignTypeScale = {
  display: string;
  h1: string;
  h2: string;
  h3: string;
  body: string;
  caption: string;
};

export type DesignMotionTokens = {
  durationInstant: string;
  durationMicro: string;
  durationFast: string;
  durationNormal: string;
  durationEmphasis: string;
  durationChoreography: string;
  easingStandard: string;
  easingExpressive: string;
  staggerSibling: string;
  staggerStream: string;
  holdReadable: string;
};

export type DesignThemeTokens = {
  color: DesignColorTokens;
  spacing: DesignSpacingScale;
  radius: DesignRadiusScale;
  elevation: DesignElevationScale;
  typography: DesignTypeScale;
  motion: DesignMotionTokens;
};

/** Stored on projects.design_tokens_json — W3C DTCG-inspired shape. */
export type ProjectDesignTokensJson = {
  version: 1;
  light: DesignThemeTokens;
  dark: DesignThemeTokens;
  meta?: {
    primaryArchetype?: string | null;
    headingFont?: string | null;
    bodyFont?: string | null;
    /** Per-project motion intensity; defaults to standard when unset. */
    motionPreference?: "reduced" | "standard" | "cinematic";
  };
};

const SPACING_BY_ARCHETYPE: Record<ArchetypeId, DesignSpacingScale> = {
  innocent: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "20px",
    xl: "32px",
    "2xl": "48px",
  },
  sage: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
    "2xl": "56px",
  },
  explorer: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "28px",
    xl: "44px",
    "2xl": "64px",
  },
  outlaw: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
  },
  magician: {
    xs: "6px",
    sm: "12px",
    md: "18px",
    lg: "28px",
    xl: "40px",
    "2xl": "56px",
  },
  hero: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "36px",
    "2xl": "48px",
  },
  lover: {
    xs: "6px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "36px",
    "2xl": "52px",
  },
  jester: {
    xs: "8px",
    sm: "12px",
    md: "20px",
    lg: "32px",
    xl: "48px",
    "2xl": "64px",
  },
  everyman: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "20px",
    xl: "32px",
    "2xl": "40px",
  },
  caregiver: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "36px",
    "2xl": "48px",
  },
  ruler: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
    "2xl": "28px",
  },
  creator: {
    xs: "8px",
    sm: "12px",
    md: "20px",
    lg: "32px",
    xl: "48px",
    "2xl": "72px",
  },
};

const RADIUS_BY_ARCHETYPE: Record<ArchetypeId, DesignRadiusScale> = {
  innocent: { sm: "6px", md: "10px", lg: "16px", full: "9999px" },
  sage: { sm: "4px", md: "8px", lg: "12px", full: "9999px" },
  explorer: { sm: "8px", md: "14px", lg: "20px", full: "9999px" },
  outlaw: { sm: "2px", md: "4px", lg: "6px", full: "9999px" },
  magician: { sm: "10px", md: "16px", lg: "24px", full: "9999px" },
  hero: { sm: "6px", md: "10px", lg: "14px", full: "9999px" },
  lover: { sm: "12px", md: "18px", lg: "28px", full: "9999px" },
  jester: { sm: "12px", md: "20px", lg: "32px", full: "9999px" },
  everyman: { sm: "6px", md: "10px", lg: "14px", full: "9999px" },
  caregiver: { sm: "8px", md: "12px", lg: "18px", full: "9999px" },
  ruler: { sm: "2px", md: "4px", lg: "8px", full: "9999px" },
  creator: { sm: "10px", md: "16px", lg: "24px", full: "9999px" },
};

const DEFAULT_TYPE_SCALE: DesignTypeScale = {
  display: "3rem",
  h1: "2.25rem",
  h2: "1.75rem",
  h3: "1.25rem",
  body: "1rem",
  caption: "0.875rem",
};

const DEFAULT_ELEVATION: DesignElevationScale = {
  sm: "0 1px 2px rgba(0,0,0,0.06)",
  md: "0 4px 12px rgba(0,0,0,0.08)",
  lg: "0 12px 32px rgba(0,0,0,0.12)",
};

/** Majico canonical motion defaults — seed new projects and merge partial reads. */
export const DEFAULT_MOTION: DesignMotionTokens = {
  durationInstant: "0ms",
  durationMicro: "140ms",
  durationFast: "200ms",
  durationNormal: "320ms",
  durationEmphasis: "600ms",
  durationChoreography: "2800ms",
  easingStandard: "cubic-bezier(0.22, 1, 0.36, 1)",
  easingExpressive: "cubic-bezier(0.16, 1, 0.3, 1)",
  staggerSibling: "100ms",
  staggerStream: "280ms",
  holdReadable: "1200ms",
};

/**
 * Merge partial motion objects with canonical defaults for backward compatibility.
 *
 * @param partial - Stored motion slice from an older or LLM-tuned project row.
 * @returns Full motion token set with missing keys filled from {@link DEFAULT_MOTION}.
 */
export function mergeMotionTokens(
  partial?: Partial<DesignMotionTokens> | null
): DesignMotionTokens {
  return { ...DEFAULT_MOTION, ...partial };
}

function coerceArchetypeId(value: unknown): ArchetypeId {
  const allowed = Object.keys(SPACING_BY_ARCHETYPE) as ArchetypeId[];
  if (typeof value === "string" && (allowed as string[]).includes(value)) {
    return value as ArchetypeId;
  }
  return "everyman";
}

function themeFromPalette(
  palette: Record<string, string> | undefined,
  archetype: ArchetypeId
): DesignThemeTokens {
  const p = palette ?? {};
  return {
    color: {
      bg: p.bg ?? "#ffffff",
      bgMuted: p.bgMuted ?? p.bg ?? "#f4f4f5",
      text: p.text ?? "#18181b",
      textMuted: p.textMuted ?? "#71717a",
      accent: p.accent ?? "#64748b",
      accentOn: p.accentOn ?? "#ffffff",
      accentMuted: p.accentMuted ?? p.accent ?? "#94a3b8",
      accent2: p.accent2,
      accent3: p.accent3,
      border: p.border ?? "#e4e4e7",
    },
    spacing: SPACING_BY_ARCHETYPE[archetype],
    radius: RADIUS_BY_ARCHETYPE[archetype],
    elevation: DEFAULT_ELEVATION,
    typography: DEFAULT_TYPE_SCALE,
    motion: { ...DEFAULT_MOTION },
  };
}

/**
 * Normalize stored design tokens by merging partial motion objects on both themes.
 *
 * @param tokens - Raw or partially migrated `design_tokens_json` payload.
 * @returns Tokens with complete motion fields on light and dark themes.
 */
export function normalizeProjectDesignTokensJson(
  tokens: ProjectDesignTokensJson
): ProjectDesignTokensJson {
  return {
    ...tokens,
    light: {
      ...tokens.light,
      motion: mergeMotionTokens(tokens.light?.motion),
    },
    dark: {
      ...tokens.dark,
      motion: mergeMotionTokens(tokens.dark?.motion),
    },
  };
}

export function buildProjectDesignTokensJson(opts: {
  primaryArchetype?: string | null;
  headingFont?: string | null;
  bodyFont?: string | null;
  paletteTokens?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  } | null;
}): ProjectDesignTokensJson {
  const archetype = coerceArchetypeId(opts.primaryArchetype);
  const lightPalette = opts.paletteTokens?.light;
  const darkPalette = opts.paletteTokens?.dark ?? lightPalette;

  return {
    version: 1,
    light: themeFromPalette(lightPalette, archetype),
    dark: themeFromPalette(darkPalette, archetype),
    meta: {
      primaryArchetype: opts.primaryArchetype ?? null,
      headingFont: opts.headingFont ?? null,
      bodyFont: opts.bodyFont ?? null,
    },
  };
}

export function validateProjectDesignTokensJson(
  value: unknown
): value is ProjectDesignTokensJson {
  if (!value || typeof value !== "object") return false;
  const v = value as ProjectDesignTokensJson;
  return (
    v.version === 1 &&
    Boolean(v.light?.color?.accent) &&
    Boolean(v.dark?.color?.bg)
  );
}
