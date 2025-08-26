"use client";

import { ThemeMode } from "@/enums";
import { ThemeProvider } from "next-themes";
import { JSX } from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * Wraps the application with ThemeProvider for dark/light/system theme control
 * @param {Props} props
 * @returns {JSX.Element}
 */
function CustomThemeProvider({ children }: Props): JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme={ThemeMode.SYSTEM}
    >
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
