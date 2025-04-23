import Loader from "./Loader";
import { AnimatePresence, motion } from "motion/react";

// import ReactModal from "react-modal";
import Logo from "./Logo";
import { useContext, useEffect } from "react";
import { GameStateContext } from "../GameState";
import { modalTransition } from "../config";
import { UIContext } from "../UIState";

// Modal which displays either a loading thing or some child content
export default function ModalFrame({ children }) {
  const { isModalOpen, closeModal } = useContext(UIContext);
  const game = useContext(GameStateContext);
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ translateY: 30, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: 30, opacity: 0 }}
          transition={modalTransition}
          className={`welcome-modal ${
            game.isLoading ? "justify-center" : "justify-between"
          }`}
        >
          {game.isLoading ? (
            <Loader />
          ) : (
            <>
              <Logo />
              {children}
              <button
                disabled={game.stage >= 2}
                onClick={() => {
                  // setGameState((p) => ({ ...p, isModalOpen: false }));
                  closeModal();
                  game.stage === 0 && game.setStage(1);
                }}
                className={`${
                  game.stage >= 2
                    ? "border-neutral-200 bg-neutral-300"
                    : "bg-purple-400 border-2 border-purple-300"
                }  py-3 cursor-pointer px-6 text-xl rounded-2xl text-white`}
              >
                {game.stage === 0 ? "Play" : "Back"}
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
