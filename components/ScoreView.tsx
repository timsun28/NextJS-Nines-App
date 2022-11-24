import { Dispatch, SetStateAction } from "react";
import { calculateTotalScore, getEmptyScores } from "../Funcs/global";
import { Player } from "../Types/global";

interface ScoreViewProps {
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    setGameStarted: Dispatch<SetStateAction<boolean>>;
    setGameFinished: Dispatch<SetStateAction<boolean>>;
}
type TotalScore = { [key: string]: number };
export const ScoreView = (props: ScoreViewProps) => {
    let totalScores: TotalScore = {};
    props.players.forEach((player) => {
        const totalScore = calculateTotalScore(player.score);
        totalScores[player.name] = totalScore;
    });

    const sorted = Object.fromEntries(Object.entries(totalScores).sort(([, a], [, b]) => a - b));

    function updateScore() {
        let players = [...props.players];
        players.forEach((player) => {
            player.score = getEmptyScores();
        });
        props.setPlayers(players);
        props.setGameFinished(false);
        props.setGameStarted(false);
    }

    return (
        <>
            <p className="text-2xl">
                Congratulation <span className="text-2xl text-primary">{Object.keys(sorted)[0]} </span>
                on winning the game!
            </p>
            <hr></hr>
            <p>Scores:</p>
            <ul>
                {Object.entries(sorted).map(([key, value], index) => (
                    <li key={index}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
            <button className="self-start gap-2 btn btn-secondary" onClick={updateScore}>
                Play Again
            </button>
        </>
    );
};
