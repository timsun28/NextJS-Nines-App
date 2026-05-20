import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  calculateTotalScore,
  finishedGame,
  getAllRounds,
  loadGameState,
  saveGameState,
} from "@/funcs/global";
import { Player } from "@/types/global";

const getCardDetails = (rank: string) => {
  switch (rank) {
    case "K":
      return { suit: "♠", colorClass: "text-base-content", emoji: "🤴" };
    case "Q":
      return { suit: "♥", colorClass: "text-red-500", emoji: "👸" };
    case "J":
      return { suit: "♣", colorClass: "text-base-content", emoji: "💂" };
    case "A":
      return { suit: "♠", colorClass: "text-base-content", emoji: "" };
    case "10":
      return { suit: "♦", colorClass: "text-red-500", emoji: "" };
    case "9":
      return { suit: "♠", colorClass: "text-base-content", emoji: "" };
    case "8":
      return { suit: "♥", colorClass: "text-red-500", emoji: "" };
    case "7":
      return { suit: "♣", colorClass: "text-base-content", emoji: "" };
    case "6":
      return { suit: "♦", colorClass: "text-red-500", emoji: "" };
    case "5":
      return { suit: "♠", colorClass: "text-base-content", emoji: "" };
    case "4":
      return { suit: "♥", colorClass: "text-red-500", emoji: "" };
    case "3":
      return { suit: "♣", colorClass: "text-base-content", emoji: "" };
    case "2":
      return { suit: "♦", colorClass: "text-red-500", emoji: "" };
    default:
      return { suit: "♠", colorClass: "text-base-content", emoji: "" };
  }
};

const getGridCols = (num: number) => {
  if (num <= 3) return "grid-cols-1 gap-y-1.5";
  if (num === 4) return "grid-cols-2 gap-x-3 gap-y-3";
  if (num <= 8) return "grid-cols-2 gap-x-3 gap-y-1";
  return "grid-cols-3 gap-x-2 gap-y-0.5";
};

export const GameScreen = ({
  players,
  setPlayers,
  setGameFinished,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setGameFinished: Dispatch<SetStateAction<boolean>>;
}) => {
  const rounds = getAllRounds();
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    const gameState = loadGameState();
    if (gameState != null) {
      setCurrentRound(gameState.currentRound);
    }
  }, []);

  const amountOfJokers = [0, 1, 2, 3, 4, 5, 6, 7];

  const handlePrev = () => {
    const prevRound = currentRound === 0 ? 0 : currentRound - 1;
    setCurrentRound(prevRound);
    saveGameState(players, prevRound);
  };

  const handleNext = () => {
    if (currentRound + 1 < rounds.length) {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      saveGameState(players, nextRound);
    } else {
      setGameFinished(true);
      finishedGame();
    }
  };

  const isLastRound = currentRound === rounds.length - 1;
  const activeRoundCard = rounds[currentRound];
  const { suit, colorClass, emoji } = getCardDetails(activeRoundCard);
  const startingPlayer = players[currentRound % players.length];

  return (
    <div className="flex flex-col gap-4 w-full animate-fade-in">
      {/* Stepper Progress */}
      <div className="w-full">
        <div className="flex justify-between items-center text-[10px] opacity-60 font-bold uppercase tracking-wider mb-1 px-1">
          <span>Round {currentRound + 1} of {rounds.length}</span>
          <span>{Math.round(((currentRound + 1) / rounds.length) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden border border-base-content/5">
          <div
            className="bg-primary h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Hot Card Showcase */}
      <div className="flex flex-col items-center py-2 select-none">
        <div className="relative w-28 h-40 rounded-2xl bg-base-200 border border-base-content/15 shadow-xl flex flex-col justify-between p-3.5 overflow-hidden group">
          {/* Card Accent Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-base-content/5 via-transparent to-base-content/5 opacity-30" />
          
          {/* Top Left corner suit/value */}
          <div className="flex flex-col items-center leading-none z-10 font-serif font-black text-lg self-start">
            <span className={colorClass}>{activeRoundCard}</span>
            <span className={`text-xs mt-0.5 ${colorClass}`}>{suit}</span>
          </div>

          {/* Center value/illustration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-5">
            {emoji ? (
              // Court/Face Cards (K, Q, J)
              <div className="border border-base-content/10 rounded-lg p-2 bg-base-300/10 flex flex-col items-center justify-center w-12 h-16 shadow-inner">
                <span className="text-3xl filter drop-shadow-sm select-none">{emoji}</span>
              </div>
            ) : activeRoundCard === "A" ? (
              // Ace
              <span className={`text-5xl font-serif font-black select-none ${colorClass}`}>{suit}</span>
            ) : (
              // Number Cards (2 - 10)
              <div className={`grid ${getGridCols(parseInt(activeRoundCard, 10))} justify-items-center items-center w-full max-w-[56px] opacity-80`}>
                {Array.from({ length: parseInt(activeRoundCard, 10) }).map((_, i) => (
                  <span key={i} className={`text-[10px] select-none ${colorClass}`}>{suit}</span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Right corner suit/value */}
          <div className="flex flex-col items-center leading-none self-end rotate-180 z-10 font-serif font-black text-lg">
            <span className={colorClass}>{activeRoundCard}</span>
            <span className={`text-xs mt-0.5 ${colorClass}`}>{suit}</span>
          </div>
        </div>




        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-base-content/50 text-center">
          Starting Player:{" "}
          <span className="text-primary font-black ml-1 text-sm normal-case tracking-normal">
            {startingPlayer?.name}
          </span>
        </p>
      </div>

      <div className="divider text-[10px] font-bold uppercase tracking-widest text-base-content/30 my-1">
        Round Scores
      </div>

      {/* Players List Grid */}
      <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-3.5 bg-base-200/40 border border-base-content/5 rounded-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-3">
              {/* Left Side: Avatar, name and total */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shadow-sm select-none">
                  {player.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm block truncate leading-none mb-1">
                    {player.name}
                  </span>
                  <span className="text-[10px] opacity-60 font-semibold uppercase tracking-wider">
                    Total: {calculateTotalScore(player.score)}
                  </span>
                </div>
              </div>

              {/* Right Side: Score Input */}
              <div className="relative w-28 shrink-0">
                <input
                  key={currentRound + "-" + index}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full input input-sm input-bordered font-bold text-center pr-8 rounded-xl"
                  placeholder="0"
                  value={player.score[activeRoundCard] ?? ""}
                  onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[index].score[activeRoundCard] = parseFloat(e.target.value) || 0;
                    setPlayers(newPlayers);
                    saveGameState(newPlayers, currentRound);
                  }}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] opacity-40 font-bold pointer-events-none uppercase tracking-wider">
                  Pts
                </span>
              </div>
            </div>

            {/* Bottom: Jokers selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider opacity-40">
                Jokers Used
              </span>
              <div className="flex gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
                {amountOfJokers.map((joker) => {
                  const isSelected = player.jokers[activeRoundCard] === joker;
                  return (
                    <button
                      key={joker}
                      type="button"
                      onClick={() => {
                        const newPlayers = [...players];
                        newPlayers[index].jokers[activeRoundCard] = joker;
                        setPlayers(newPlayers);
                        saveGameState(newPlayers, currentRound);
                      }}
                      className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-lg border transition-all duration-200 shrink-0 ${
                        isSelected
                          ? "bg-primary border-primary text-primary-content shadow-sm shadow-primary/20 scale-105"
                          : "bg-base-300/40 border-base-content/10 text-base-content/60 hover:border-base-content/25"
                      }`}
                    >
                      {joker}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-2 pt-2 border-t border-base-content/5">
        <button
          type="button"
          className="btn btn-outline border-base-content/10 hover:border-base-content/30 flex-1 rounded-2xl gap-1.5 font-bold"
          disabled={currentRound === 0}
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>

        <button
          type="button"
          className="btn btn-primary flex-[2] rounded-2xl gap-1.5 font-extrabold shadow-md shadow-primary/20"
          onClick={handleNext}
        >
          {isLastRound ? (
            <>
              Finish & Score
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
                  d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.303-1.2-.81-1.549L15.5 11.25m-7 4.125v-3.375c0-.621.303-1.2.81-1.549L9.5 11.25m-1.622-1.005a9.002 9.002 0 0 1 16.244 0M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </>
          ) : (
            <>
              Next Round
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

