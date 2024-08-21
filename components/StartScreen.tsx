import { useEffect, Dispatch, SetStateAction } from "react";
import { loadGameState, saveGameState } from "@/funcs/global";
import { Player } from "@/types/global";
import { ThemeSelect } from "@/components/ThemeSelect";
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
        <>
            <h1 className="text-2xl">Welcome to the Nines Score App</h1>
            <p>Start by adding your players here:</p>
            <p>Player 1 will start the game</p>
            <PlayersInput players={players} setPlayers={setPlayers} />
            <div className="flex justify-between">
                <AddNewPlayerButton players={players} setPlayers={setPlayers} />
                <StartGameButton players={players} setGameStarted={setGameStarted} saveGameState={saveGameState} />
            </div>

            <ContinueGameButton
                previousPlayers={previousPlayers}
                previousRound={previousRound}
                setPlayers={setPlayers}
                setGameStarted={setGameStarted}
                saveGameState={saveGameState}
            />

            <ThemeSelect />
        </>
    );
};
