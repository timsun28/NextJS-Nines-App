export type Round = "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "A";

export type Score = {
    [key in Round]: number | string;
};

export interface Player {
    name: string;
    score: Score;
}
