import { Player } from "@/types/global";
import { Dispatch, SetStateAction } from "react";

export const StartGameButton = ({
    players,
    setGameStarted,
    saveGameState,
}: {
    players: Player[];
    setGameStarted: Dispatch<SetStateAction<boolean>>;
    saveGameState: (players: Player[], round: number) => void;
}) => {
    return (
        <button
            className="gap-2 btn btn-primary"
            onClick={() => {
                saveGameState(players, 0);
                setGameStarted(true);
            }}
        >
            Start Game
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    );
};
