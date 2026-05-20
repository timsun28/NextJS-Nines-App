import { useEffect, Dispatch, SetStateAction } from "react";
import { loadGameState, saveGameState } from "@/funcs/global";
import { Player } from "@/types/global";
import { ContinueGameButton } from "@/components/ContinueGameButton";
import { StartGameButton } from "@/components/StartGameButton";
import { AddNewPlayerButton } from "@/components/AddNewPlayerButton";
import { PlayersInput } from "@/components/PlayersInput";

export const StartScreen = ({
  players,
  previousPlayers,
  previousRound,
  setPlayers,
  setPreviousPlayers,
  setPreviousRound,
  setGameStarted,
}: {
  players: Player[];
  previousPlayers: Player[];
  previousRound: number;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setPreviousPlayers: Dispatch<SetStateAction<Player[]>>;
  setPreviousRound: Dispatch<SetStateAction<number>>;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const gameState = loadGameState();
    if (gameState != null) {
      setPreviousPlayers(gameState.players);
      setPreviousRound(gameState.currentRound);
    } else {
      setPreviousPlayers([]);
      setPreviousRound(0);
    }
  }, [setPreviousPlayers, setPreviousRound]);

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {/* Resume Game Section at top if available */}
      <ContinueGameButton
        previousPlayers={previousPlayers}
        previousRound={previousRound}
        setPlayers={setPlayers}
        setGameStarted={setGameStarted}
        saveGameState={saveGameState}
      />

      {/* Hero Welcome */}
      <div className="text-center flex flex-col items-center gap-2">
        <span className="text-4xl">🃏</span>
        <h2 className="text-2xl font-extrabold tracking-tight">New Game</h2>
        <p className="text-sm opacity-70 max-w-[280px] mx-auto text-balance font-medium leading-relaxed">
          Add players below. Player 1 starts the game.
        </p>
      </div>

      {/* Player Input Area */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-widest text-base-content/40 px-1">
          Players (2 - 6)
        </label>
        <PlayersInput players={players} setPlayers={setPlayers} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <AddNewPlayerButton players={players} setPlayers={setPlayers} />
        <StartGameButton
          players={players}
          setGameStarted={setGameStarted}
          saveGameState={saveGameState}
        />
      </div>
    </div>
  );
};

