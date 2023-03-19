import { useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import {getEmptyScores, getThemes, loadGameState, saveGameState, titleCase} from "../Funcs/global";
import { Player } from "../Types/global";

// @ts-ignore
import { themeChange } from "theme-change";

interface StartScreenProps {
    players: Player[];
    previousPlayers: Player[]
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    setPreviousPlayers: Dispatch<SetStateAction<Player[]>>;
    setGameStarted: Dispatch<SetStateAction<boolean>>;
}

export const StartScreen = (props: StartScreenProps) => {
    useEffect(() => {
        themeChange(false);
        // 👆 false parameter is required for react

        props.setPreviousPlayers(loadGameState())
    }, []);

    const themes = getThemes();

    function updateName(event: ChangeEvent<HTMLInputElement>, index: number) {
        let players = [...props.players];
        let item = { ...players[index] };
        item.name = event?.currentTarget.value;
        players[index] = item;
        props.setPlayers(players);
    }

    function continueGame() {
        saveGameState(props.previousPlayers);
        props.setPlayers(props.previousPlayers)
        props.setGameStarted(true)
    }

    function startGame() {
        saveGameState(props.players);
        props.setGameStarted(true)
    }

    return (
        <>
            <h1 className="text-2xl">Welcome to Nines Score App</h1>
            <p>Start by adding your players here:</p>
            <p>Player 1 will start the game</p>
            {props.players.map((player, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Player ${index + 1}`}
                    className="w-full input input-bordered"
                    value={player.name}
                    onChange={(e) => updateName(e, index)}
                />
            ))}
            <div className="flex justify-between">
                <button
                    className="gap-2 btn btn-secondary"
                    onClick={(event) => {
                        if (props.players.length >= 6) {
                            return;
                        }
                        props.setPlayers([...props.players, { name: "", score: getEmptyScores() }]);
                    }}
                >
                    Add new Player
                </button>
                <button className="gap-2 btn btn-primary" onClick={ () => startGame() } >
                    Start Game
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            </div>
            {props.previousPlayers.length != 0 &&
                <div className="flex justify-center">
                    <button className="btn btn-primary w-full" onClick={ () => continueGame() }>
                        Continue Game (
                        {props.previousPlayers.map((player, f) => f < 3 && <p key={f}>{player.name}{f + 1 != props.previousPlayers.length && ','}</p>)}
                        {props.previousPlayers.length > 2 && <p>...</p>}
                        )
                    </button>
                </div>
            }
            <label className="label">
                <span className="label-text">Choose your theme</span>
            </label>
            <select className="w-full select select-bordered" data-choose-theme>
                {themes.map((theme, index) => (
                    <option key={index} value={theme}>
                        {titleCase(theme)}
                    </option>
                ))}
            </select>
        </>
    );
};
