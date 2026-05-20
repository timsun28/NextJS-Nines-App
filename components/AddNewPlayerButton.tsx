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
  const isMaxPlayers = players.length >= 6;

  return (
    <button
      type="button"
      className="btn btn-outline border-base-content/20 hover:border-primary hover:bg-primary/5 hover:text-primary rounded-2xl flex-1 justify-center gap-2 transition-all duration-300 font-semibold"
      disabled={isMaxPlayers}
      onClick={() => {
        if (isMaxPlayers) return;
        setPlayers((prev) => {
          return [...prev, { name: "", score: getEmptyScores(), jokers: getEmptyScores() }];
        });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Player
    </button>
  );
};

