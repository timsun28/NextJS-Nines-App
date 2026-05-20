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

  // Get initial letters of previous players
  const playerNames = previousPlayers.map((p) => p.name || "?");

  return (
    <div className="w-full p-4 bg-info/10 border border-info/20 rounded-2xl flex flex-col gap-3">
      <div className="flex items-start gap-3">
        {/* Info Icon */}
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-info/20 text-info shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.656 48.656 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7C4.547 9.34 4.5 10.561 4.5 12c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.092-1.209.138-2.43.138-3.662Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 1 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.852l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-base-content leading-none">Unfinished Game Found</h4>
          <p className="text-[11px] opacity-70 mt-1 font-medium">
            You can resume the game with these players:
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {playerNames.map((name, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg bg-base-300 text-[10px] font-bold text-base-content/80 shadow-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-info btn-sm rounded-xl font-bold w-full gap-1 shadow-md shadow-info/20"
        onClick={() => {
          saveGameState(previousPlayers, previousRound);
          setPlayers(previousPlayers);
          setGameStarted(true);
        }}
      >
        Resume Game
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </button>
    </div>
  );
};

