import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { parseThemeFromLabs, createThemeWithAccentColor, applyThemeToDOM } from '../utils/themeUtils';
import { useGetSiteSettingsQuery } from '../api/settings';

// Define theme structure based on your SiteSettings theme JSON
export interface ThemeColors {
    primary: string;
    'primary-text': string;
    secondary: string;
    'secondary-text': string;
    bg: string;
    'bg-text': string;
    'bg-surface': string;
    'bg-surface-text': string;
    'bg-highlight': string;
    'bg-highlight-text': string;
}

interface ThemeContextType {
    isLoading: boolean;
    themeColors: ThemeColors | null;
    setCustomTheme: (colors: Partial<ThemeColors>) => void;
}

export const defaultThemeColors: ThemeColors = {
    primary: '#5300E8',  // Changed to match the default in CSS
    'primary-text': '#FEFEFE',
    secondary: '#D5CDFF',
    'secondary-text': '#6B12FF',
    bg: '#F5F5F5',  // Light mode default
    'bg-text': '#333333',
    'bg-surface': '#F5F5F5',
    'bg-surface-text': '#333333',
    'bg-highlight': '#EAEAEA',
    'bg-highlight-text': '#333333',
};

const ThemeContext = createContext<ThemeContextType>({
    isLoading: true,
    themeColors: defaultThemeColors,
    setCustomTheme: () => { },
});


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [themeColors, setThemeColors] = useState<ThemeColors | null>(defaultThemeColors);
    const [result] = useGetSiteSettingsQuery();

    // Apply theme when it changes
    useEffect(() => {
        if (themeColors) {
            applyThemeToDOM(themeColors);
        }
    }, [themeColors]);

    // Process theme data when site settings are loaded
    useEffect(() => {
        if (result.data?.siteSettings) {
            const settings = result.data.siteSettings;


            try {
                // Priority 1: Try to parse the theme field directly from settings
                let themeColors: ThemeColors | null = null;
                
                if (settings.theme) {
                    try {
                        const parsedTheme = JSON.parse(settings.theme);
                        
                        // Check if the parsed theme has the necessary properties
                        if (parsedTheme && typeof parsedTheme === 'object') {
                            // Merge with default theme to ensure all properties exist
                            themeColors = { ...defaultThemeColors, ...parsedTheme };
                        }
                    } catch (error) {
                        console.error('Error parsing theme JSON:', error);
                    }
                }

                // Priority 2: If no theme from theme field, try to parse from labs
                if (!themeColors && settings.labs) {
                    themeColors = parseThemeFromLabs(settings.labs);
                }

                // Priority 3: If no theme found in theme field or labs, but we have accentColor, create a theme with it
                if (!themeColors && settings.accentColor) {
                    themeColors = createThemeWithAccentColor(
                        settings.accentColor,
                        defaultThemeColors
                    );
                }

                // Use the parsed theme or fallback to default
                if (themeColors) {
                    setThemeColors(themeColors);
                } else {
                    // Apply default theme if parsing fails
                    console.log('Falling back to default theme');
                    setThemeColors(defaultThemeColors);
                }
            } catch (error) {
                console.error('Error processing theme:', error);
                setThemeColors(defaultThemeColors);
            }


            setIsLoading(false);
        }
    }, [result.data]);

    // Function to allow components to override specific theme colors
    const setCustomTheme = (customColors: Partial<ThemeColors>) => {
        setThemeColors(current => {
            if (!current) return { ...defaultThemeColors, ...customColors };
            return { ...current, ...customColors };
        });
    };

    return (
        <ThemeContext.Provider value={{ isLoading, themeColors, setCustomTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);