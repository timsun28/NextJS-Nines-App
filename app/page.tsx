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
    console.log({ players });
    const [previousPlayers, setPreviousPlayers] = useState<Player[]>([]);
    const [previousRound, setPreviousRound] = useState<number>(0);

    if (gameFinished) {
        return (
            <ScoreView
                players={players}
                setPlayers={setPlayers}
                setGameStarted={setGameStarted}
                setGameFinished={setGameFinished}
            />
        );
    }

    if (gameStarted) {
        return <GameScreen players={players} setPlayers={setPlayers} setGameFinished={setGameFinished} />;
    }

    return (
        <StartScreen
            players={players}
            previousPlayers={previousPlayers}
            previousRound={previousRound}
            setPlayers={setPlayers}
            setPreviousPlayers={setPreviousPlayers}
            setPreviousRound={setPreviousRound}
            setGameStarted={setGameStarted}
        />
    );
}
