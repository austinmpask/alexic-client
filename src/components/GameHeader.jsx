import { useContext } from "react";
import { GameStateContext } from "../GameState";
import { toCombo, toWord } from "../utils";
import { CircleHelp, Pyramid, Undo } from "lucide-react";

export default function GameHeader() {
  const { gameState, setGameState, gameInfo } = useContext(GameStateContext);

  function handleUndo() {
    if (
      JSON.stringify(gameState.combo) !==
      JSON.stringify(
        toCombo(gameState.usedWords[gameState.usedWords.length - 1])
      )
    ) {
      setGameState((p) => ({
        ...p,
        combo: toCombo(gameState.usedWords[gameState.usedWords.length - 1]),
      }));
      // console.log("reverted");
      return;
    }
    if (gameState.usedWords.length > 1) {
      const lastWord = gameState.usedWords[gameState.usedWords.length - 2];
      setGameState((p) => {
        const n = [...p.usedWords];
        n.pop();
        return { ...p, usedWords: n, combo: toCombo(lastWord) };
      });
      // setCombo(toCombo(lastWord));
    } else {
      setGameState((p) => ({
        ...p,
        combo: toCombo(gameState.usedWords[gameState.usedWords.length - 1]),
      }));
    }
  }
  return (
    <div className="w-full flex-col flex items-center gap-2">
      <div className="flex flex-row w-full justify-between px-5">
        <button
          className={`cursor-pointer px-4 ${
            gameState.usedWords.length > 1 ||
            toWord(gameState.combo) !==
              gameState.usedWords[gameState.usedWords.length - 1]
              ? "text-neutral-950"
              : "text-neutral-300"
          }`}
          onClick={handleUndo}
        >
          <Undo />
        </button>
        <div className="select-none border-2 box-glow border-amber-200 bg-amber-100 rounded-3xl text-lg font-semibold tracking-widest flex flex-row items-center justify-center gap-2 text-amber-500 py-3 px-4">
          <Pyramid size={20} />
          {gameInfo.goldenWord}
        </div>
        <button
          onClick={() => setGameState((p) => ({ ...p, isModalOpen: true }))}
          className="px-4 cursor-pointer"
        >
          <CircleHelp />
        </button>
      </div>
    </div>
  );
}
