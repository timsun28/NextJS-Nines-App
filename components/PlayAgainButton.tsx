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
      type="button"
      className="w-full btn btn-primary rounded-2xl gap-2 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:scale-[1.01] active:scale-95 transition-all duration-300 py-3.5"
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
      Play Again
    </button>
  );
};

