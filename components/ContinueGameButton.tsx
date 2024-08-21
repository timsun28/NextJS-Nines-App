import { Player } from "@/types/global";
import { Dispatch, SetStateAction } from "react";

export const ContinueGameButton = ({
    previousPlayers,
    previousRound,
    setPlayers,
    setGameStarted,
    saveGameState,
}: {
    previousPlayers: Player[];
    previousRound: number;
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    setGameStarted: Dispatch<SetStateAction<boolean>>;
    saveGameState: (players: Player[], round: number) => void;
}) => {
    if (previousPlayers.length === 0) {
        return null;
    }
    return (
        <div className="flex justify-center">
            <button
                className="btn btn-primary w-full"
                onClick={() => {
                    saveGameState(previousPlayers, previousRound);
                    setPlayers(previousPlayers);
                    setGameStarted(true);
                }}
            >
                <span className="truncate">
                    Continue Game ({previousPlayers.map((player) => player.name).join(", ")})
                </span>
            </button>
        </div>
    );
};
