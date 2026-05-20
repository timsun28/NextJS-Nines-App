import { Dispatch, SetStateAction } from "react";
import { calculateTotalScore } from "@/funcs/global";
import { Player } from "@/types/global";
import { ScoreGraph } from "./ScoreGraph";
import { PlayAgainButton } from "@/components/PlayAgainButton";

// Lightweight, self-contained CSS confetti component
const ConfettiEffect = () => {
  const colors = ["#ff0055", "#00ffcc", "#ffcc00", "#ff6600", "#9900ff", "#33ccff"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
      {Array.from({ length: 45 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = Math.random() * 2 + 2;
        const size = Math.random() * 7 + 5;
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            className="absolute -top-4 rounded-sm animate-[confetti-fall_linear_infinite]"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export const ScoreView = ({
  players,
  setPlayers,
  setGameStarted,
  setGameFinished,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
  setGameFinished: Dispatch<SetStateAction<boolean>>;
}) => {
  let totalScores: { [key: string]: number } = {};
  let totalWins: { [key: string]: number } = {};
  let totalJokers: { [key: string]: number } = {};

  players.forEach((player) => {
    const totalScore = calculateTotalScore(player.score);
    totalScores[player.name] = totalScore;
    totalWins[player.name] = Object.values(player.score).filter((score) => {
      if (typeof score === "string") {
        return score === "" || score === "0";
      }
      return score === 0;
    }).length;


    // calculate total jokers
    totalJokers[player.name] = Object.values(player.jokers).reduce(
      (sum: number, value: number | string) => {
        if (typeof value === "number") {
          return sum + value;
        }
        return sum;
      },
      0,
    );
  });

  const sortedTotalScore = Object.fromEntries(
    Object.entries(totalScores).sort(([, a], [, b]) => a - b),
  );

  const winnerName = Object.keys(sortedTotalScore)[0];
  const winnerScore = sortedTotalScore[winnerName];

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in relative">
      {/* Celebration Header Card */}
      <div className="relative overflow-hidden p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5 rounded-3xl border border-primary/15 text-center flex flex-col items-center gap-3 shadow-lg select-none">
        <ConfettiEffect />
        <div className="w-12 h-12 rounded-full bg-warning flex items-center justify-center shadow-lg shadow-warning/20 animate-bounce z-10 text-2xl">
          👑
        </div>
        <div className="z-10">
          <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest leading-none mb-1">
            Victory Celebration
          </p>
          <h2 className="text-2xl font-black tracking-tight text-base-content">
            Congratulations <span className="text-primary font-black">{winnerName}</span>!
          </h2>
          <p className="text-xs opacity-75 font-semibold mt-1">
            Won the game with <span className="text-secondary font-black">{winnerScore}</span> points
          </p>
        </div>
      </div>

      {/* Leaderboard Standings */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold uppercase tracking-widest text-base-content/40 px-1">
          Final Standings
        </label>
        <div className="flex flex-col gap-2">
          {Object.entries(sortedTotalScore).map(([name, totalScore], index) => {
            const rank = index + 1;
            const wins = totalWins[name];
            const jokers = totalJokers[name];

            let cardClass = "bg-base-200/40 border border-base-content/5";
            let rankBadgeClass = "bg-base-300 text-base-content/70";
            let rankIcon = `#${rank}`;

            if (rank === 1) {
              cardClass =
                "bg-gradient-to-r from-warning/15 via-base-200 to-warning/5 border-2 border-warning/30 shadow-md";
              rankBadgeClass = "bg-warning text-warning-content font-black shadow-sm shadow-warning/20";
              rankIcon = "👑";
            } else if (rank === 2) {
              cardClass =
                "bg-gradient-to-r from-slate-400/10 via-base-200 to-slate-400/5 border border-slate-400/20";
              rankBadgeClass = "bg-slate-400 text-white font-black";
              rankIcon = "🥈";
            } else if (rank === 3) {
              cardClass =
                "bg-gradient-to-r from-amber-700/10 via-base-200 to-amber-700/5 border border-amber-700/20";
              rankBadgeClass = "bg-amber-700 text-white font-black";
              rankIcon = "🥉";
            }

            return (
              <div
                key={name}
                className={`flex flex-col gap-2.5 p-3.5 rounded-2xl ${cardClass} relative overflow-hidden transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Rank Indicator */}
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs select-none ${rankBadgeClass}`}
                    >
                      {rankIcon}
                    </span>
                    <span className="font-extrabold text-sm text-base-content">{name}</span>
                  </div>
                  {/* Score badge */}
                  <div className="text-right">
                    <span className="text-[10px] opacity-40 font-bold uppercase tracking-wider block">
                      Score
                    </span>
                    <span className="text-base font-black text-primary leading-none">
                      {totalScore} <span className="text-[10px] font-bold opacity-60">pts</span>
                    </span>
                  </div>
                </div>

                {/* Substats */}
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-success/10 text-success text-[10px] font-bold flex items-center gap-1 select-none">
                    🏆 {wins} {wins === 1 ? "Win" : "Wins"}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-info/10 text-info text-[10px] font-bold flex items-center gap-1 select-none">
                    🃏 {jokers} {jokers === 1 ? "Joker" : "Jokers"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Graph Area */}
      <div className="flex flex-col gap-2 p-4 bg-base-200/30 border border-base-content/5 rounded-2xl">
        <label className="text-xs font-bold uppercase tracking-widest text-base-content/40 px-0.5">
          Score Timeline Graph
        </label>
        <div className="mt-2">
          <ScoreGraph players={players} />
        </div>
      </div>

      {/* Play Again Button */}
      <PlayAgainButton
        setPlayers={setPlayers}
        setGameFinished={setGameFinished}
        setGameStarted={setGameStarted}
      />
    </div>
  );
};

