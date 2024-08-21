import { Dispatch, SetStateAction } from "react";
import { calculateTotalScore, getEmptyScores } from "@/funcs/global";
import { Player } from "@/types/global";
import { ScoreGraph } from "./ScoreGraph";
import { PlayAgainButton } from "@/components/PlayAgainButton";

export const ScoreView = ({
    players,
    setPlayers,
    setGameStarted,
    setGameFinished,
}: {
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    setGameStarted: Dispatch<SetStateAction<boolean>>;
    setGameFinished: Dispatch<SetStateAction<boolean>>;
}) => {
    let totalScores: { [key: string]: number } = {};
    let totalWins: { [key: string]: number } = {};
    let totalJokers: { [key: string]: number } = {};

    players.forEach((player) => {
        const totalScore = calculateTotalScore(player.score);
        totalScores[player.name] = totalScore;
        totalWins[player.name] = Object.values(player.score).filter(
            (score) => typeof score === "string" || score === 0
        ).length;

        // calculate total jokers
        totalJokers[player.name] = Object.values(player.jokers).reduce((sum: number, value: number | string) => {
            if (typeof value === "number") {
                return sum + value;
            }
            return sum;
        }, 0);
    });

    const sortedTotalScore = Object.fromEntries(Object.entries(totalScores).sort(([, a], [, b]) => a - b));

    return (
        <>
            <p className="text-2xl">
                Congratulation <span className="text-2xl text-primary">{Object.keys(sortedTotalScore)[0]} </span>
                on winning the game!
            </p>
            <hr></hr>
            <p>Scores:</p>
            <ul>
                {Object.entries(sortedTotalScore).map(([key, value], index) => (
                    <li key={index}>
                        {key}: {value} points total - {totalWins[key]} wins - {totalJokers[key]} jokers
                    </li>
                ))}
            </ul>
            <ScoreGraph players={players} />
            <PlayAgainButton
                setPlayers={setPlayers}
                setGameFinished={setGameFinished}
                setGameStarted={setGameStarted}
            />
        </>
    );
};
