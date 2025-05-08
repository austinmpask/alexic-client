import { useContext } from "react";
import { GameStateContext } from "../GameState";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { modalTransition } from "../config";
import { UIContext } from "../UIState";

export default function PreviousWords() {
  const game = useContext(GameStateContext);
  const { isHistoryOpen } = useContext(UIContext);
  const wordOpacities = [
    "opacity-20",
    "opacity-30",
    "opacity-35",
    "opacity-40",
    "opacity-50",
    "opacity-60",
    "opacity-70",
    "opacity-80",
    "opacity-90",
    "opacity-100",
  ];
  return (
    <AnimatePresence>
      {isHistoryOpen && (
        <motion.div
          initial={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: 30, opacity: 0 }}
          transition={modalTransition}
          className="gap-2 absolute z-10 button-glow flex flex-col items-center rounded-4xl w-6/10 h-fit p-4 text-purple-700 bg-purple-100 border-2 border-purple-300 bottom-20"
        >
          <p className="text-purple-400 text-lg mb-3">History</p>
          {game.usedWords.map((w, i) => (
            <motion.div
              key={i}
              initial={{ translateY: 50, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: 30, opacity: 0 }}
              transition={{
                duration: 0.2,
                delay: (game.usedWords.length - i) / 20,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <p
                className={`font-semibold tracking-widest ${
                  wordOpacities[
                    Math.round(
                      wordOpacities.length * ((i + 1) / game.usedWords.length)
                    ) - 1
                  ]
                }`}
              >
                {w}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
