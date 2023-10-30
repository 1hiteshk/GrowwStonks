"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
        {/* <button
         onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >{theme === 'dark' ? 'light' : 'dark'} </button> */}
      {/* the current theme is : {theme}
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button> */}
    </div>
  );
};

