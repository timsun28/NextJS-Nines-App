import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { calculateTotalScore, finishedGame, getAllRounds, loadGameState, saveGameState } from "../funcs/global";
import { Player } from "../types/global";
import { themeChange } from "theme-change";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

interface GameScreenProps {
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    setGameFinished: Dispatch<SetStateAction<boolean>>;
}

export const GameScreen = ({ players, setPlayers, setGameFinished }: GameScreenProps) => {
    const rounds = getAllRounds();
    const [currentRound, setCurrentRound] = useState<number>(0);

    useEffect(() => {
        const gameState = loadGameState();

        if (gameState != null) {
            setCurrentRound(gameState.currentRound);
        }
    }, [setCurrentRound]);

    function updateScore(event: ChangeEvent<HTMLInputElement>, index: number) {
        const newPlayers = [...players];
        newPlayers[index].score[rounds[currentRound]] = parseFloat(event.target.value) || 0;
        setPlayers(newPlayers);
        saveGameState(newPlayers, currentRound);
    }

    function updateJokers(amountOfJokers: number, index: number) {
        const newPlayers = [...players];
        newPlayers[index].jokers[rounds[currentRound]] = amountOfJokers;
        setPlayers(newPlayers);
        saveGameState(newPlayers, currentRound);
    }

    function endGame() {
        setGameFinished(true);
        finishedGame();
    }
    const amountOfJokers = [0, 1, 2, 3, 4, 5, 6, 7];
    return (
        <>
            <p className="text-5xl">
                The <span className="text-primary">{rounds[currentRound]}</span> is hot!
            </p>
            <p className="text-2xl">
                Player to start: <span className="text-primary">{players[currentRound % players.length].name}</span>
            </p>
            <hr></hr>
            <p className="text-lg">Scores (leave empty if the player won)</p>
            {players.map((player, index) => (
                <Fragment key={index}>
                    <div key={index} className="flex flex-row items-center justify-between gap-2">
                        <span className="w-1/4">
                            {player.name}: {calculateTotalScore(player.score)}
                        </span>
                        <input
                            key={currentRound + index}
                            type="number"
                            className="w-3/4 input input-bordered"
                            placeholder="0"
                            value={player.score[rounds[currentRound]]}
                            onChange={(e) => updateScore(e, index)}
                        />
                    </div>
                    <div className="w-full flex gap-2">
                        {amountOfJokers.map((joker) => (
                            <span
                                key={joker}
                                onClick={() => updateJokers(joker, index)}
                                className={`flex cursor-pointer items-center justify-center grow rounded-lg p-2 border border-gray-400 ${
                                    player.jokers[rounds[currentRound]] === joker && "bg-primary text-white"
                                }`}
                            >
                                {joker}
                            </span>
                        ))}
                    </div>
                </Fragment>
            ))}{" "}
            <div className="flex justify-between">
                <button
                    className="gap-2 btn btn-primary"
                    onClick={() => setCurrentRound(currentRound === 0 ? 0 : currentRound - 1)}
                >
                    Previous Round
                </button>
                <button
                    className="gap-2 btn btn-primary"
                    onClick={() => (currentRound + 1 < rounds.length ? setCurrentRound(currentRound + 1) : endGame())}
                >
                    Next Round
                </button>
            </div>
        </>
    );
};
