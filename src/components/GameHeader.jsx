import { useContext } from "react";
import { GameStateContext } from "../GameState";
import { toCombo, toWord } from "../utils";
import { CircleHelp, Pyramid, Undo } from "lucide-react";
import { UIContext } from "../UIState";

export default function GameHeader({}) {
  const game = useContext(GameStateContext);
  const { openModal, touch } = useContext(UIContext);

  function handleUndo() {
    const combo = toCombo(game.getLastWord());
    // If the current displayed combo is not equal to the last recorded word, just revert the displayed combo
    if (JSON.stringify(game.combo) !== JSON.stringify(combo)) {
      game.setCombo(combo);
    } else if (game.usedWords.length > 1) {
      // Revert back to the previous word if user is trying to undo while looking at the last recorded word
      game.setCombo(toCombo(game.getLastWord(2)));
      game.popWord();
    }
    touch(-1);
  }
  return (
    <div className="w-full flex-col flex items-center gap-2">
      <div className="grid grid-cols-3 place-items-center w-full">
        <button
          className={`transition-all duration-450 cursor-pointer px-4 ${
            game.usedWords.length > 1 ||
            toWord(game.combo) !== game.getLastWord()
              ? "text-neutral-950"
              : "text-neutral-300"
          }`}
          onClick={handleUndo}
        >
          <Undo />
        </button>
        <div className="select-none border-2 box-glow border-amber-200 bg-amber-100 rounded-3xl text-lg font-semibold tracking-widest flex flex-row items-center justify-center gap-2 text-amber-500 py-3 px-4">
          <Pyramid size={20} />
          {game.goldenWord}
        </div>
        <button onClick={() => openModal()} className="px-4 cursor-pointer">
          <CircleHelp />
        </button>
      </div>
    </div>
  );
}
