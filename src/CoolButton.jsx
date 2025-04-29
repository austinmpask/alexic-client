import { WandSparkles } from "lucide-react";
import { useContext } from "react";
import { GameStateContext } from "./GameState";
import { toWord } from "./utils";

export default function CoolButton({ onClick }) {
  const game = useContext(GameStateContext);
  return (
    <button
      onClick={onClick}
      disabled={!game.canSubmit}
      className={`select-none w-fit group gap-1 relative inline-flex h-16 sm:h-18 items-center justify-center overflow-hidden rounded-3xl sm:rounded-4xl py-3 sm:px-6 px-4 font-medium transition ${
        game.canSubmit
          ? "scale-110 bg-purple-400 button-glow border-purple-300 border-2 text-white cursor-pointer"
          : "bg-neutral-300 border-2 border-neutral-300 text-neutral-100"
      }`}
    >
      {!game.canSubmit ? (
        <WandSparkles size={17} />
      ) : (
        <WandSparkles size={17} />
      )}
      <span className="text-lg sm:text-xl tracking-widest">
        {!game.canSubmit ? game.getLastWord() : toWord(game.combo)}
      </span>
      <div
        className={`absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] ${
          game.canSubmit &&
          "duration-1000 [transform:skew(-12deg)_translateX(100%)]"
        }`}
      >
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  );
}
