"use client";

import { useState } from "react";
import { GameScreen } from "@/components/GameScreen";
import { ScoreView } from "@/components/ScoreView";
import { StartScreen } from "@/components/StartScreen";
import { getEmptyScores } from "@/funcs/global";
import { Player } from "@/types/global";

export default function Home() {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameFinished, setGameFinished] = useState<boolean>(false);
    const [players, setPlayers] = useState<Player[]>([
        { name: "", score: getEmptyScores(), jokers: getEmptyScores() },
        { name: "", score: getEmptyScores(), jokers: getEmptyScores() },
    ]);
    const [previousPlayers, setPreviousPlayers] = useState<Player[]>([]);
    const [previousRound, setPreviousRound] = useState<number>(0);
    return (
        <main className="flex flex-col justify-center min-h-screen gap-2 p-4 md:mx-auto md:max-w-md">
            {!gameFinished ? (
                <>
                    {!gameStarted ? (
                        <StartScreen
                            players={players}
                            previousPlayers={previousPlayers}
                            previousRound={previousRound}
                            setPlayers={setPlayers}
                            setPreviousPlayers={setPreviousPlayers}
                            setPreviousRound={setPreviousRound}
                            setGameStarted={setGameStarted}
                        />
                    ) : (
                        <GameScreen players={players} setPlayers={setPlayers} setGameFinished={setGameFinished} />
                    )}
                </>
            ) : (
                <ScoreView
                    players={players}
                    setPlayers={setPlayers}
                    setGameStarted={setGameStarted}
                    setGameFinished={setGameFinished}
                />
            )}
        </main>
    );
}
