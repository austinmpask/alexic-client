import { useContext } from "react";
import { GameStateContext } from "../GameState";
import { toCombo, toWord } from "../utils";
import { CircleHelp, Pyramid, Undo } from "lucide-react";

export default function GameHeader({
  s0,
  s1,
  s2,
  s3,
  sS0,
  sS1,
  sS2,
  sS3,
  setLastTouched,
}) {
  const { gameState, setGameState, gameInfo } = useContext(GameStateContext);
  // console.log([s0, s1, s2, s3]);

  function handleUndo() {
    const combo = toCombo(gameState.usedWords[gameState.usedWords.length - 1]);
    // setLastTouched(null);
    // If the current displayed combo is not equal to the last recorded word, just revert the displayed combo
    if (JSON.stringify([s0, s1, s2, s3]) !== JSON.stringify(combo)) {
      console.log("one");
      // Revert the combo back to original
      if (s0 !== combo[0]) {
        sS0(combo[0]);
      }
      if (s1 !== combo[1]) {
        sS1(combo[1]);
      }
      if (s2 !== combo[2]) {
        sS2(combo[2]);
      }
      if (s3 !== combo[3]) {
        sS3(combo[3]);
      }
      // setLastTouched(-1);
    } else if (gameState.usedWords.length > 1) {
      console.log("two");
      // Revert back to the previous word if user is trying to undo while looking at the last recorded word
      const lastWord = gameState.usedWords[gameState.usedWords.length - 2];

      // Reset the usedWords by one
      setGameState((p) => {
        const n = [...p.usedWords];
        n.pop();
        return { ...p, usedWords: n };
      });

      // Update the games combo
      const lastCombo = toCombo(lastWord);
      s0 !== lastCombo[0] && sS0(lastCombo[0]);
      s1 !== lastCombo[1] && sS1(lastCombo[1]);
      s2 !== lastCombo[2] && sS2(lastCombo[2]);
      s3 !== lastCombo[3] && sS3(lastCombo[3]);
      // setCombo(toCombo(lastWord));
    } else {
      // setLastTouched(null);
      console.log("three");
      s0 !== combo[0] && sS0(combo[0]);
      s1 !== combo[1] && sS1(combo[1]);
      s2 !== combo[2] && sS2(combo[2]);
      s3 !== combo[3] && sS3(combo[3]);
      // setGameState((p) => ({
      //   ...p,
      //   combo: toCombo(gameState.usedWords[gameState.usedWords.length - 1]),
      // }));
    }
    setLastTouched(-1);
  }
  return (
    <div className="w-full flex-col flex items-center gap-2">
      <div className="flex flex-row w-full justify-between px-5">
        <button
          className={`cursor-pointer px-4 ${
            gameState.usedWords.length > 1 ||
            toWord([s0, s1, s2, s3]) !==
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
          onClick={() =>
            setGameState((p) => ({
              ...p,
              isModalOpen: true,
              isHistoryOpen: false,
            }))
          }
          className="px-4 cursor-pointer"
        >
          <CircleHelp />
        </button>
      </div>
    </div>
  );
}
