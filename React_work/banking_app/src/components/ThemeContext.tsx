import {
  useInsertionEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import { ThemeContext } from "./theme-context.ts";
import type { Theme } from "./theme-context.ts";


export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [
    theme,
    setTheme,
  ] = useState<Theme>("light");


  // ==================================
  // useInsertionEffect
  // ==================================
  //
  // Demonstration of style injection.
  // In real applications this hook is
  // mainly used by CSS-in-JS libraries.
  //

  useInsertionEffect(() => {

    const style =
      document.createElement(
        "style"
      );

    style.setAttribute(
      "data-banking-theme",
      "true"
    );


    style.textContent =
      theme === "dark"
        ? `
          body {
            background: #111827;
            color: #f9fafb;
          }

          .dashboard-container {
            background: #111827 !important;
          }

          .card {
            background: #1f2937 !important;
            color: #f9fafb;
          }
        `
        : `
          body {
            background: #f4f7fb;
            color: #111827;
          }
        `;


    document.head.appendChild(
      style
    );


    return () => {

      style.remove();
    };

  }, [theme]);


  const toggleTheme = () => {

    setTheme(
      currentTheme =>
        currentTheme === "light"
          ? "dark"
          : "light"
    );
  };


  return (

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}


