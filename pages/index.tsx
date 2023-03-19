import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { GameScreen } from "../components/GameScreen";
import { ScoreView } from "../components/ScoreView";
import { StartScreen } from "../components/StartScreen";
import { getEmptyScores } from "../Funcs/global";
import { Player } from "../Types/global";

const Home: NextPage = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameFinished, setGameFinished] = useState<boolean>(false);
    const [players, setPlayers] = useState<Player[]>([
        { name: "", score: getEmptyScores() },
        { name: "", score: getEmptyScores() },
    ]);
    const [previousPlayers, setPreviousPlayers] = useState<Player[]>([])

    return (
        <div>
            <Head>
                <title>Nines Score</title>
                <meta name="description" content="Keep track of your nines score" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <main className="flex flex-col justify-center h-screen gap-2 p-4 md:mx-auto md:max-w-md">
                {!gameFinished ? (
                    <>
                        {!gameStarted ? (
                            <StartScreen players={players} previousPlayers={previousPlayers} setPlayers={setPlayers} setPreviousPlayers={setPreviousPlayers} setGameStarted={setGameStarted} />
                        ) : (
                            <GameScreen players={players} setPlayers={setPlayers} setGameFinished={setGameFinished} />
                        )}{" "}
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
        </div>
    );
};

export default Home;
