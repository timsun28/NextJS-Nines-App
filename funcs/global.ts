import { Player, Round, Score } from "../types/global";

export function getAllRounds(): Round[] {
    return ["K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];
}

export function getColors(): string[] {
    return [
        "rgb(75, 192, 192)",
        "rgb(255, 99, 71)",
        "rgb(255, 165, 0)",
        "rgb(218, 165, 32)",
        "rgb(153, 50, 204)",
        "rgb(60, 179, 113)",
        "rgb(255, 215, 0)",
        "rgb(255, 140, 0)",
    ];
}

export function getEmptyScores(): Score {
    const rounds = getAllRounds();
    return rounds.reduce((x: Partial<Score>, round) => ((x[round] = ""), x), {}) as Score;
}

export function titleCase(string: string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function calculateTotalScore(playerScore: Score) {
    let totalScore = 0;
    Object.values(playerScore).forEach((score) => {
        if (typeof score === "number") {
            totalScore += score;
        }
    });
    return totalScore;
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
        "dim",
        "nord",
        "sunset",
        "caramellatte",
        "abyss",
        "silk",
    ];
}

export function saveGameState(players: Player[], currentRound: number): void {
    let buff = Buffer.from(JSON.stringify({ players, currentRound }));
    localStorage.setItem("gameState", buff.toString("base64"));
}

export function finishedGame(): void {
    localStorage.clear();
}

export function loadGameState(): { players: Player[]; currentRound: number } | null {
    const gameState = localStorage.getItem("gameState");

    if (gameState === null) return null;

    return JSON.parse(Buffer.from(gameState, "base64").toString("utf-8")) as {
        players: Player[];
        currentRound: number;
    };
}
