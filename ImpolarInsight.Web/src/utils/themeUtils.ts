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
      const themeData = typeof labs.theme === 'string' 
        ? JSON.parse(labs.theme) 
        : labs.theme;
      
      return themeData;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing labs JSON:', error);
    return null;
  }
};

/**
 * Helper function to lighten a hex color
 * @param hex Hex color code with or without the # prefix
 * @param amount Amount to lighten (0-1)
 * @returns Lightened hex color
 */
const lightenColor = (hex: string, amount: number): string => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex value
  const num = parseInt(hex, 16);
  
  // Extract RGB components
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  
  // Lighten each component
  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));
  
  // Convert back to hex
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

/**
 * Helper function to darken a hex color
 * @param hex Hex color code with or without the # prefix
 * @param amount Amount to darken (0-1)
 * @returns Darkened hex color
 */
const darkenColor = (hex: string, amount: number): string => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex value
  const num = parseInt(hex, 16);
  
  // Extract RGB components
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  
  // Darken each component
  r = Math.max(0, Math.round(r * (1 - amount)));
  g = Math.max(0, Math.round(g * (1 - amount)));
  b = Math.max(0, Math.round(b * (1 - amount)));
  
  // Convert back to hex
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

/**
 * Determines whether a color is light or dark
 * @param hex Hex color code with or without # prefix
 * @returns True if color is light, false if dark
 */
const isLightColor = (hex: string): boolean => {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse the hex value
  const num = parseInt(hex, 16);
  
  // Extract RGB components
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  
  // Calculate perceived brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  
  // Return true if the color is light (brightness > 0.5)
  return brightness > 0.5;
};

/**
 * Creates a theme object with the accent color
 * @param accentColor Hex color code with or without the # prefix
 * @param baseTheme Base theme to extend
 * @returns ThemeColors object with the accent color applied
 */
export const createThemeWithAccentColor = (
  accentColor: string,
  baseTheme: ThemeColors
): ThemeColors => {
  // Ensure accentColor has # prefix
  const colorWithoutHash = accentColor.replace(/^#/, '');
  const primary = `#${colorWithoutHash}`;
  
  // Determine text color based on primary color brightness
  const primaryText = isLightColor(primary) ? '#222222' : '#FFFFFF';
  
  // Create secondary color (lighter version of primary)
  const secondary = lightenColor(primary, 0.8);
  const secondaryText = darkenColor(primary, 0.1);
  
  // Determine whether to use a light or dark theme based on primary color
  const isDarkTheme = !isLightColor(primary);
  
  // Create a derived theme using the accent color
  return {
    primary: primary,
    'primary-text': primaryText,
    secondary: secondary,
    'secondary-text': secondaryText,
    bg: isDarkTheme ? '#0E0E11' : '#FFFFFF',
    'bg-text': isDarkTheme ? '#FAFAFA' : '#333333',
    'bg-surface': isDarkTheme ? '#18181B' : '#F5F5F5',
    'bg-surface-text': isDarkTheme ? '#FAFAFA' : '#333333',
    'bg-highlight': isDarkTheme ? '#28252D' : '#EAEAEA',
    'bg-highlight-text': isDarkTheme ? '#FAFAFA' : '#333333',
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