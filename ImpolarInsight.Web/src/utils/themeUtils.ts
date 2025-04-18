import { ThemeColors } from '../contexts/ThemeContext';

/**
 * Parses the theme JSON from the labs field in SiteSettings
 * @param labsJson JSON string from SiteSettings.labs
 * @returns ThemeColors object or null if parsing fails
 */
export const parseThemeFromLabs = (labsJson: string): ThemeColors | null => {
  try {
    const labs = JSON.parse(labsJson);
    
    if (labs && labs.theme) {
      return JSON.parse(labs.theme);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing labs JSON:', error);
    return null;
  }
};

/**
 * Creates a theme object with the accent color
 * @param accentColor Hex color code without the # prefix
 * @param baseTheme Base theme to extend
 * @returns ThemeColors object with the accent color applied
 */
export const createThemeWithAccentColor = (
  accentColor: string,
  baseTheme: ThemeColors
): ThemeColors => {
  // Create a derived theme using the accent color
  return {
    ...baseTheme,
    primary: `#${accentColor}`,
    // You could also generate complementary colors here
  };
};

/**
 * Applies theme colors to CSS custom properties on the root element
 * @param colors ThemeColors object
 */
export const applyThemeToDOM = (colors: ThemeColors): void => {
  const root = document.documentElement;
  
  // Apply each color to its corresponding CSS variable
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-impolar-${key}`, value);
  });
};