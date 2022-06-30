import { Round, Score } from "../Types/global";

export function getAllRounds(): Round[] {
    return ["K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];
}

export function getEmptyScores(): Score {
    const rounds = getAllRounds();
    return rounds.reduce((x: Partial<Score>, round) => ((x[round] = 0), x), {}) as Score;
}

export function titleCase(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function getThemes(): string[] {
    return [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
    ];
}
