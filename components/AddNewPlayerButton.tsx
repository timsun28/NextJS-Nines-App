import { getEmptyScores } from "@/funcs/global";
import { Player } from "@/types/global";
import { Dispatch, SetStateAction } from "react";

export const AddNewPlayerButton = ({
    players,
    setPlayers,
}: {
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
    return (
        <button
            className="gap-2 btn btn-secondary"
            onClick={() => {
                if (players.length >= 6) {
                    return;
                }
                setPlayers((prev) => {
                    return [...prev, { name: "", score: getEmptyScores(), jokers: getEmptyScores() }];
                });
            }}
        >
            Add new Player
        </button>
    );
};
