"use client";

import { getThemes, titleCase } from "@/funcs/global";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export const ThemeSelect = () => {
  const themes = getThemes();

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle text-base-content/80 hover:bg-base-content/10"
        aria-label="Change theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a15.997 15.997 0 0 1-4.763-4.649"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-50 menu p-2 shadow-2xl bg-base-200 border border-base-content/10 rounded-2xl w-52 max-h-80 overflow-y-auto mt-2"
      >
        <li className="menu-title text-xs font-bold text-base-content/50 px-2 py-1 select-none">
          Select Theme
        </li>
        {themes.map((theme, index) => (
          <li key={index}>
            <button
              className="py-1.5 px-3 rounded-lg text-sm hover:bg-base-300 font-medium text-left"
              data-set-theme={theme}
            >
              {titleCase(theme)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

