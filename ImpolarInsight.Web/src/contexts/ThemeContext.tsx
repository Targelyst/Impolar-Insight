import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery } from 'urql';
import { graphql } from '../gql';
import { parseThemeFromLabs, createThemeWithAccentColor, applyThemeToDOM } from '../utils/themeUtils';
import { useGetSiteSettingsQuery } from '../api/projects';

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
    primary: '#000000',
    'primary-text': '#FEFEFE',
    secondary: '#D5CDFF',
    'secondary-text': '#6B12FF',
    bg: '#0E0E11',
    'bg-text': '#FAFAFA',
    'bg-surface': '#18181B',
    'bg-surface-text': '#FAFAFA',
    'bg-highlight': '#28252D',
    'bg-highlight-text': '#FAFAFA',
};

const ThemeContext = createContext<ThemeContextType>({
    isLoading: true,
    themeColors: defaultThemeColors,
    setCustomTheme: () => { },
});


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    console.log('ThemeProvider rendered');
    const [isLoading, setIsLoading] = useState(true);
    const [themeColors, setThemeColors] = useState<ThemeColors | null>(defaultThemeColors);
    const [result] = useGetSiteSettingsQuery();
    console.log('Query result:', result);

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

            console.log('Site settings:', settings);

            try {
                // Try to parse theme from the labs field
                let themeColors: ThemeColors | null = null;

                if (settings.labs) {
                    themeColors = parseThemeFromLabs(settings.labs);
                }

                // If no theme found in labs, but we have accentColor, create a theme with it
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
                    setThemeColors(defaultThemeColors);
                }
            } catch (error) {
                console.error('Error processing theme:', error);
                setThemeColors(defaultThemeColors);
            }

            console.log('Theme colors set:', themeColors);

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