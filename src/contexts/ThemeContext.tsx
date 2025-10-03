import React, { createContext, useState, useContext, ReactNode } from "react";
import { Appearance } from "react-native";

type CustomTheme = "light" | "dark";

type ThemeContextType = {
  theme: CustomTheme;
  toggleTheme: () => void;
  colors: typeof themeColors.light;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  return useContext(ThemeContext);
}

const themeColors = {
  light: {
    background: "#FFF",
    text: "#000",
    button: "#007bff",
    buttonText: "#fff",
    input: "#f0f0f0",
    inputText: "#000",
    placeHolderTextColor: "#555",
  },
  dark: {
    background: "#121212",
    text: "#fff",
    button: "#3fd92b",
    buttonText: "#000",
    input: "#333",
    inputText: "#fff",
    placeHolderTextColor: "#aaa",
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();

  const [theme, setTheme] = useState<CustomTheme>(
    colorScheme === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: themeColors[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light" as CustomTheme,
      toggleTheme: () => {},
      colors: themeColors.light,
    };
  }
  return context;
};
