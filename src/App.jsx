import "swiper/css";
import CoolButton from "./CoolButton";
import LetterSwipe from "./LetterSwipe";
import ReactModal from "react-modal";
import { CircleHelp, KeyRound, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { games } from "./games";
import { dateFormat, isValidWord, toCombo, toWord } from "./utils";

// Import Swiper styles

export default function App() {
  // Get todays puzzle

  const gameWords = games[dateFormat(new Date())];
  const target = gameWords[1];
  const [moves, setMoves] = useState(0);
  const [modal, setModal] = useState(true);
  const [gameState, setGameState] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [usedWords, setUsedWords] = useState([gameWords[0]]);
  const [combo, setCombo] = useState(toCombo(gameWords[0]));
  const [lastCombo, setLastCombo] = useState(gameWords[0]);

  useEffect(() => {
    // Check if the word is valid

    if (combo !== toCombo(usedWords[usedWords.length - 1])) {
      // Check how many differences there are
      let count = 0;
      combo.forEach((letter, i) => {
        if (letter !== toCombo(usedWords[usedWords.length - 1])[i]) {
          count += 1;
        }
      });

      console.log(count);

      // Valid move, one letter changed
      if (count === 1) {
        setLastCombo([...combo]);
      } else if (count > 1) {
        // Figure out the most recently changed index
        let index = 0;
        combo.forEach((letter, i) => {
          if (letter !== lastCombo[i]) {
            index = i;
          }
        });

        // Revert the other parts of the combo to the valid word besides that index
        setCombo((p) => {
          const n = [...p];
          for (let i = 0; i < n.length; i++) {
            if (i !== index) {
              n[i] = toCombo(usedWords[usedWords.length - 1])[i];
            }
          }
          return n;
        });
      }
    }
    if (
      isValidWord(toWord(combo)) &&
      toWord(combo) != usedWords[usedWords.length - 1]
    ) {
      // Allow the player to commit that move and increment moves
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
    // Check if they got the target word
  }, [combo, usedWords]);

  // Increment the players moves and update last saved word when they commit a turn
  function handleCommit() {
    setMoves((p) => p + 1);
    setUsedWords((p) => {
      const w = [...p];
      w.push(toWord(combo));
      return w;
    });
    setCanSubmit(false);
  }

  function handleUndo() {
    if (
      JSON.stringify(combo) !==
      JSON.stringify(toCombo(usedWords[usedWords.length - 1]))
    ) {
      setCombo(toCombo(usedWords[usedWords.length - 1]));
      console.log("reverted");
      return;
    }
    if (usedWords.length > 1) {
      const lastWord = usedWords[usedWords.length - 2];
      setUsedWords((p) => {
        const n = [...p];
        n.pop();
        return n;
      });
      setCombo(toCombo(lastWord));
    } else {
      setCombo(toCombo(usedWords[usedWords.length - 1]));
    }
  }

  // Check for win or loss
  useEffect(() => {
    if (toWord(combo) === target) {
      alert("You win");
    } else if (moves >= 10) {
      alert("You lose");
    }
  }, [moves]);

  useEffect(() => {
    console.log(usedWords);
  }, [usedWords]);
  return (
    <div className="pb-10 h-dvh w-dvw relative">
      <ReactModal isOpen={modal} className={"welcome-modal"}>
        <div className="shadow flex flex-col items-center justify-between border-neutral-50 border-2 h-3/4 w-[90%] text-center text-neutral-950 text-lg rounded-4xl bg-white py-10 px-7">
          LOGO
          <div className="flex-col flex gap-8">
            <span>
              Switch the letters on the combo lock one at a time to match the
              <span className="text-blue-500"> target word</span>
            </span>
            <p>
              The combo lock must display a valid english word inorder to switch
              a letter
            </p>
            <p>
              Can you match the{" "}
              <span className="text-blue-500"> target word</span> in under 10
              switches?
            </p>
          </div>
          <button
            onClick={() => {
              setModal(false);
              gameState === 0 && setGameState(1);
            }}
            className="bg-blue-500 py-3 px-6 text-xl rounded-2xl text-white"
          >
            {gameState === 0 ? "Play" : "Back"}
          </button>
        </div>
      </ReactModal>
      <div className="grid gap-1 grid-cols-10 h-2 w-full">
        {Array.from({ length: moves }, (_, i) => (
          <div key={i} className="w-full h-full bg-rose-500"></div>
        ))}
      </div>
      <div className="py-10 h-full flex flex-col items-center justify-between">
        <div className="flex flex-row w-full justify-between px-5">
          <button className="cursor-pointer px-4" onClick={handleUndo}>
            <Undo />
          </button>
          <div className="select-none border-2 border-neutral-50 rounded-3xl text-lg font-semibold tracking-widest flex flex-row items-center justify-center gap-2 text-blue-500 py-3 px-4 shadow">
            <KeyRound size={20} />
            {gameWords[1]}
          </div>
          <button onClick={() => setModal(true)} className="px-4">
            <CircleHelp />
          </button>
        </div>
        <div className="h-[200px] w-full px-8 select-none relative">
          <div className="grid grid-cols-4 h-full w-full relative z-0">
            <LetterSwipe i={0} val={combo} setVal={setCombo} />
            <LetterSwipe i={1} val={combo} setVal={setCombo} />
            <LetterSwipe i={2} val={combo} setVal={setCombo} />
            <LetterSwipe i={3} val={combo} setVal={setCombo} />
          </div>
          {!modal && (
            <>
              <div className="overlay-top"></div>
              <div className="overlay-bottom"></div>
            </>
          )}
        </div>

        <CoolButton
          disabled={!canSubmit}
          text={toWord(combo)}
          last={usedWords[usedWords.length - 1]}
          onClick={handleCommit}
        />
      </div>
    </div>
  );
}
