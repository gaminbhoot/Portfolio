import React, { createContext, useState, useEffect, useMemo } from 'react';

export const ThemeContext = createContext({
  theme: "glass",
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ide-theme") || "glass";
  });

  useEffect(() => {
    localStorage.setItem("ide-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
