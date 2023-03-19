import {Player, Round, Score} from "../Types/global";

export function getAllRounds(): Round[] {
    return ["K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];
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
    ];
}

export function saveGameState(players: Player[]): void {
    let buff = new Buffer(JSON.stringify(players));
    localStorage.setItem('gameState', buff.toString('base64'))
}

export function finishedGame(): void {
    localStorage.clear()
}

export function loadGameState(): Player[] {
    const gameState = localStorage.getItem('gameState');

    if (gameState === null) return [];

    return JSON.parse(new Buffer(gameState, 'base64').toString('utf-8')) as Player[];
}
