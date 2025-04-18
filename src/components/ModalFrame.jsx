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

  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    setViewportHeight();

    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);
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
