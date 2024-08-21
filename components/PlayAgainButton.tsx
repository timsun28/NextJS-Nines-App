import { Dispatch, SetStateAction } from "react";
import { Player } from "@/types/global";
import { getEmptyScores } from "@/funcs/global";

export const PlayAgainButton = ({
    setPlayers,
    setGameFinished,
    setGameStarted,
}: {
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    setGameFinished: Dispatch<SetStateAction<boolean>>;
    setGameStarted: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <button
            className="self-start gap-2 btn btn-secondary"
            onClick={() => {
                setPlayers((currentPlayers) => {
                    const players = [...currentPlayers];
                    return players.map((player) => {
                        return {
                            ...player,
                            score: getEmptyScores(),
                        };
                    });
                });
                setGameFinished(false);
                setGameStarted(false);
            }}
        >
            Play Again
        </button>
    );
};
