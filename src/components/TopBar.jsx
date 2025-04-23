import { Flame } from "lucide-react";
import { useContext } from "react";
import { GameStateContext } from "../GameState";

export default function TopBar() {
  const game = useContext(GameStateContext);
  const widths = [
    "w-0/10",
    "w-1/10",
    "w-2/10",
    "w-3/10",
    "w-4/10",
    "w-5/10",
    "w-6/10",
    "w-7/10",
    "w-8/10",
    "w-9/10",
    "w-10/10",
  ];
  return (
    <div className="w-full flex flex-row">
      <div
        className={` text-sm px-2 py-1 text-purple-500 bg-purple-200 rounded-r-full flex-row flex justify-center w-fit items-center relative`}
      >
        <Flame size={16} />
        <span>{game.difficulty}</span>
      </div>

      <div className="grid grid-cols-10 h-full w-full items-center place-items-center mx-3 relative">
        <div
          className={`absolute left-0 spring rounded-r-full ${
            widths[game.moves]
          } ${
            game.moves ? "opacity-100" : "opacity-50"
          } h-full bg-purple-100 -z-1`}
        ></div>
        <div
          className={`absolute -left-8 rounded-full spring ${
            game.moves ? "opacity-100 w-12" : "opacity-50 w-0"
          }
          } h-full bg-purple-100 -z-1`}
        ></div>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={`transition-all ease-[cubic-bezier(.48,2.63,.51,1.02)] duration-150 rounded-full border-2 ${
              i < game.moves
                ? "bg-purple-400 border-purple-300 w-4.5 h-4.5"
                : "bg-purple-100 border-purple-50 w-2.5 h-2.5"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
