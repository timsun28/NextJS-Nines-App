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
        <>
            <label className="label">
                <span className="label-text">Choose your theme</span>
            </label>
            <select className="w-full select select-bordered" data-choose-theme>
                {themes.map((theme, index) => (
                    <option key={index} value={theme}>
                        {titleCase(theme)}
                    </option>
                ))}
            </select>
        </>
    );
};
