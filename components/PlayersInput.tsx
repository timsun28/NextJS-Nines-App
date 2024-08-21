import { Player } from "@/types/global";
import { Dispatch, SetStateAction } from "react";

export const PlayersInput = ({
    players,
    setPlayers,
}: {
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
    return players.map((player, index) => (
        <input
            key={index}
            type="text"
            placeholder={`Player ${index + 1}`}
            className="w-full input input-bordered"
            value={player.name}
            onChange={(e) => {
                setPlayers((currentPlayers) => {
                    const newPlayers = [...currentPlayers];
                    newPlayers[index].name = e.target.value;
                    return newPlayers;
                });
            }}
        />
    ));
};
