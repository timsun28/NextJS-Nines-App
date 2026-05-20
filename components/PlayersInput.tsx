import { Player } from "@/types/global";
import { Dispatch, SetStateAction } from "react";

export const PlayersInput = ({
  players,
  setPlayers,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  // Define vibrant gradient backgrounds for players
  const avatarGradients = [
    "from-primary to-secondary text-primary-content",
    "from-secondary to-accent text-secondary-content",
    "from-accent to-primary text-accent-content",
    "from-info to-success text-info-content",
    "from-success to-warning text-success-content",
    "from-warning to-error text-warning-content",
  ];

  const deletePlayer = (indexToRemove: number) => {
    if (players.length <= 2) return;
    setPlayers((currentPlayers) => currentPlayers.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {players.map((player, index) => (
        <div
          key={index}
          className="flex flex-row items-center gap-3 p-2 bg-base-200/50 rounded-2xl border border-base-content/5 transition-all duration-300 focus-within:border-primary/20 focus-within:bg-base-200"
        >
          {/* Avatar indicator */}
          <div
            className={`flex-none flex items-center justify-center w-10 h-10 rounded-xl font-bold bg-gradient-to-tr shadow-sm ${
              avatarGradients[index % avatarGradients.length]
            }`}
          >
            {player.name.trim() ? player.name.trim().substring(0, 2).toUpperCase() : `P${index + 1}`}
          </div>

          {/* Name input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Enter Player ${index + 1} Name`}
              className="w-full bg-transparent border-0 outline-none text-base font-semibold placeholder:text-base-content/40 focus:ring-0 px-1"
              value={player.name}
              onChange={(e) => {
                setPlayers((currentPlayers) => {
                  const newPlayers = [...currentPlayers];
                  newPlayers[index] = {
                    ...newPlayers[index],
                    name: e.target.value,
                  };
                  return newPlayers;
                });
              }}
            />
          </div>

          {/* Delete button (minimum 2 players) */}
          {players.length > 2 && (
            <button
              type="button"
              onClick={() => deletePlayer(index)}
              className="flex-none btn btn-ghost btn-circle btn-sm text-error hover:bg-error/15"
              title="Remove player"
              aria-label="Remove player"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

