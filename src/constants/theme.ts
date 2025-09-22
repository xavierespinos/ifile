/**
 * Theme constants for consistent styling across the application
 * All spacing values are multiples of 4 for consistent design system
 */

// Base unit for spacing (4px)
const BASE_UNIT = 4;

export const UNIT = {
  // Common spacing units (multiples of 4)
  XS: BASE_UNIT,        // 4px
  SM: BASE_UNIT * 2,    // 8px
  MD: BASE_UNIT * 3,    // 12px
  LG: BASE_UNIT * 4,    // 16px
  XL: BASE_UNIT * 5,    // 20px
  XXL: BASE_UNIT * 6,   // 24px
  XXXL: BASE_UNIT * 8,  // 32px

  // Specific spacing values
  SPACING_2: BASE_UNIT * 0.5,   // 2px (for fine adjustments)
  SPACING_4: BASE_UNIT,         // 4px
  SPACING_8: BASE_UNIT * 2,     // 8px
  SPACING_12: BASE_UNIT * 3,    // 12px
  SPACING_16: BASE_UNIT * 4,    // 16px
  SPACING_20: BASE_UNIT * 5,    // 20px
  SPACING_24: BASE_UNIT * 6,    // 24px
  SPACING_32: BASE_UNIT * 8,    // 32px
  SPACING_40: BASE_UNIT * 10,   // 40px
  SPACING_48: BASE_UNIT * 12,   // 48px
  SPACING_64: BASE_UNIT * 16,   // 64px
} as const;

export const COLORS = {
  // Primary colors
  PRIMARY: '#007AFF',
  PRIMARY_DARK: '#0056CC',
  PRIMARY_LIGHT: '#e3f2fd',

  // Background colors
  BACKGROUND_PRIMARY: '#ffffff',
  BACKGROUND_SECONDARY: '#f3f2f2ff',
  BACKGROUND_TERTIARY: '#f8f8f8',

  // Text colors
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  TEXT_TERTIARY: '#6f6e6eff',
  TEXT_LIGHT: '#ffffff',

  // Border colors
  BORDER_PRIMARY: '#cccccc',
  BORDER_SECONDARY: '#dddddd',

  // Status colors
  SUCCESS: '#4CAF50',
  ERROR: '#ff4444',
  WARNING: '#FF9800',
  INFO: '#2196F3',

  // Shadow colors
  SHADOW: '#000000',

  // Transparent
  TRANSPARENT: 'transparent',
} as const;

export const BORDER_RADIUS = {
  SM: UNIT.XS,          // 4px
  MD: UNIT.SM,          // 8px
  LG: UNIT.MD,          // 12px
  XL: UNIT.LG,          // 16px
  ROUND: UNIT.XL,       // 20px
  CIRCLE: 50,           // 50px for circular elements
} as const;

export const FONT_SIZE = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 32,
} as const;

export const FONT_WEIGHT = {
  LIGHT: '300' as const,
  NORMAL: '400' as const,
  MEDIUM: '500' as const,
  SEMIBOLD: '600' as const,
  BOLD: '700' as const,
} as const;

export const SHADOWS = {
  SMALL: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  MEDIUM: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
  },
  LARGE: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 15,
  },
} as const;

// Common spacing patterns
export const LAYOUT = {
  CONTAINER_PADDING: UNIT.XL,           // 20px
  CONTENT_PADDING: UNIT.XL,             // 20px
  SECTION_MARGIN: UNIT.XL,              // 20px
  ITEM_SPACING: UNIT.LG,                // 16px
  SMALL_SPACING: UNIT.SM,               // 8px
} as const;

export default {
  UNIT,
  COLORS,
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SHADOWS,
  LAYOUT,
};