import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {calculateTotalScore, finishedGame, getAllRounds, saveGameState} from "../Funcs/global";
import { Player } from "../Types/global";

interface GameScreenProps {
    players: Player[];
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    setGameFinished: Dispatch<SetStateAction<boolean>>;
}

export const GameScreen = (props: GameScreenProps) => {
    const rounds = getAllRounds();
    const [currentRound, setCurrentRound] = useState<number>(0);
    function updateScore(event: ChangeEvent<HTMLInputElement>, index: number) {
        const newScore = event.currentTarget.value;
        let players = [...props.players];
        let item = { ...players[index] };
        item.score[rounds[currentRound]] = parseFloat(newScore);
        players[index] = item;
        props.setPlayers(players);
        saveGameState(players);
    }

    function endGame() {
        props.setGameFinished(true);
        finishedGame();
    }

    return (
        <>
            <p className="text-5xl">
                The <span className="text-primary">{rounds[currentRound]}</span> is hot!
            </p>
            <p className="text-2xl">
                Player to start:{" "}
                <span className="text-primary">{props.players[currentRound % props.players.length].name}</span>
            </p>
            <hr></hr>
            <p className="text-lg">Scores (leave empty if the player won)</p>
            {props.players.map((player, index) => (
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
                    onClick={() =>
                        currentRound + 1 < rounds.length
                            ? setCurrentRound(currentRound + 1)
                            : endGame()
                    }
                >
                    Next Round
                </button>
            </div>
        </>
    );
};
