import { CircleHelp, Pyramid, Undo } from "lucide-react";
import { animate } from "motion";
import { useContext, useEffect, useRef } from "react";
import { GameStateContext } from "../GameState";
import { UIContext } from "../UIState";
import { toCombo, toWord } from "../utils";

export default function GameHeader() {
  const game = useContext(GameStateContext);
  const { openModal, touch } = useContext(UIContext);

  const goldenRef = useRef();

  const animationAmounts = {
    scale: 1.25,
    rotate: 5,
  };

  useEffect(() => {
    game.stage === 1 &&
      goldenRef.current &&
      setTimeout(() => {
        // console.log("boom");
        const sequence = [
          // Scale up
          [
            goldenRef.current,
            { scale: animationAmounts.scale },
            { duration: 0.3 },
          ],
          // Pause
          [
            goldenRef.current,
            { scale: animationAmounts.scale },
            { duration: 0.05 },
          ],
          // Wiggle
          [
            goldenRef.current,
            { rotate: animationAmounts.rotate },
            { duration: 0.1 },
          ],
          [
            goldenRef.current,
            { rotate: -animationAmounts.rotate },
            { duration: 0.1 },
          ],
          [
            goldenRef.current,
            { rotate: animationAmounts.rotate },
            { duration: 0.1 },
          ],
          [goldenRef.current, { rotate: 0 }, { duration: 0.1 }],
          // Pause
          [goldenRef.current, { rotate: 0 }, { duration: 0.1 }],
          // Scale down
          [goldenRef.current, { scale: 1.0 }, { duration: 0.3 }],
        ];
        animate(sequence);
      }, 1100);
  }, [game.stage, goldenRef.current]);

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
        <div
          ref={goldenRef}
          className="select-none border-2 box-glow border-amber-200 bg-amber-100 rounded-3xl text-lg sm:text-2xl font-semibold tracking-widest flex flex-row items-center justify-center gap-2 text-amber-500 py-3 px-4"
        >
          <Pyramid className="size-4.5 sm:size-6" />
          {game.goldenWord}
        </div>
        <button onClick={() => openModal()} className="px-4 cursor-pointer">
          <CircleHelp />
        </button>
      </div>
    </div>
  );
}
