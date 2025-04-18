import Loader from "./Loader";

// import ReactModal from "react-modal";
import Logo from "./Logo";
import { useContext, useEffect } from "react";
import { GameStateContext } from "../GameState";

// Modal which displays either a loading thing or some child content
export default function ModalFrame({
  children,

  footer,
}) {
  const { gameState, setGameState } = useContext(GameStateContext);

  // useEffect(() => {
  //   // Function to manually adjust the modal height to actual viewport height
  //   const adjustModalHeight = () => {
  //     const modal = document.querySelector(".welcome-modal");
  //     if (modal) {
  //       modal.style.height = `${window.innerHeight}px`;
  //     }
  //   };

  //   // Recalculate height after modal opens
  //   if (gameState.isModalOpen) {
  //     adjustModalHeight();
  //   }

  //   // Event listener to handle changes in viewport height (resize)
  //   window.addEventListener("resize", adjustModalHeight);

  //   // Clean up listener on unmount
  //   return () => window.removeEventListener("resize", adjustModalHeight);
  // }, [gameState.isModalOpen]);
  return (
    gameState.isModalOpen && (
      <div
        className={`welcome-modal ${
          gameState.isLoading ? "justify-center" : "justify-between"
        }`}
      >
        {gameState.isLoading ? (
          <Loader />
        ) : (
          <>
            <Logo />
            {children}
            <button
              disabled={gameState.stage >= 2}
              onClick={() => {
                setGameState((p) => ({ ...p, isModalOpen: false }));
                gameState.stage === 0 &&
                  setGameState((p) => ({ ...p, stage: 1 }));
              }}
              className={`${
                gameState.stage >= 2
                  ? "border-neutral-200 bg-neutral-300"
                  : "bg-purple-400 border-2 border-purple-300"
              }  py-3 cursor-pointer px-6 text-xl rounded-2xl text-white`}
            >
              {gameState.stage === 0 ? "Play" : "Back"}
            </button>
          </>
        )}
      </div>
    )
  );
}
