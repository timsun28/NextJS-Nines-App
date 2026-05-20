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
  const handleStart = () => {
    // Fill empty names with default names "Player 1", "Player 2" etc.
    const normalizedPlayers = players.map((player, idx) => {
      const trimmedName = player.name.trim();
      return {
        ...player,
        name: trimmedName ? trimmedName : `Player ${idx + 1}`,
      };
    });

    saveGameState(normalizedPlayers, 0);
    setGameStarted(true);
  };

  return (
    <button
      type="button"
      className="btn btn-primary rounded-2xl flex-1 justify-center gap-2 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:scale-[1.02] active:scale-95 transition-all duration-300"
      onClick={handleStart}
    >
      Start Game
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-4 h-4"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
};

