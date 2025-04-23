import { useContext } from "react";
import { GameStateContext } from "../GameState";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { modalTransition } from "../config";
import { UIContext } from "../UIState";

export default function PreviousWords() {
  const game = useContext(GameStateContext);
  const { isHistoryOpen } = useContext(UIContext);
  return (
    <AnimatePresence>
      {isHistoryOpen && (
        <motion.div
          initial={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: 30, opacity: 0 }}
          transition={modalTransition}
          className="gap-2 absolute z-10 button-glow flex flex-col items-center rounded-3xl w-8/10 h-fit p-4 text-purple-700 bg-purple-100 border-2 border-purple-300 bottom-20"
        >
          <p className="text-purple-400 text-lg mb-3">History</p>
          {game.usedWords.map((w, i) => (
            <p key={i} className="font-semibold tracking-widest">
              {w}
            </p>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
