import { Flame } from "lucide-react";
import { useContext } from "react";
import { GameStateContext } from "../GameState";

export default function TopBar() {
  const { gameState, gameInfo } = useContext(GameStateContext);
  return (
    <div className="w-full flex flex-row">
      <div
        className={` text-sm px-2 py-1 text-purple-400 bg-purple-100 rounded-r-full flex-row flex justify-center w-fit items-center`}
      >
        <Flame size={14} />
        <span>{gameInfo.difficulty}</span>
      </div>

      <div className="grid gap-1.5 grid-cols-10 w-full items-center place-items-center px-3">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`transition-all ease-[cubic-bezier(.48,2.63,.51,1.02)] duration-150 rounded-full border-2 ${
              i < gameState.moves
                ? "bg-purple-400 border-purple-300 w-4.5 h-4.5"
                : "bg-purple-100 border-purple-50 w-2.5 h-2.5"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
