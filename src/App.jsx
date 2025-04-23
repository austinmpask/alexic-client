import "swiper/css";
import CoolButton from "./CoolButton";
import EndModalContent from "./components/EndModalContent";
import GameHeader from "./components/GameHeader";
import LetterSwipe from "./LetterSwipe";
import ModalFrame from "./components/ModalFrame";
import TopBar from "./components/TopBar";
import TutorialModalContent from "./components/TutorialModalContent";
import { useContext, useEffect, useState } from "react";
import { GameStateContext } from "./GameState";
import { isValidWord, toCombo, toWord } from "./utils";
import PreviousWords from "./components/PreviousWords";
import { BookText, Undo, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { modalTransition } from "./config";

// Import Swiper styles

export default function App() {
  const { gameState, gameInfo, setGameState } = useContext(GameStateContext);
  const [canSubmit, setCanSubmit] = useState(false);
  // Store swiper indexes separately to avoid glitches with sliders
  const [s0, sS0] = useState(0);
  const [s1, sS1] = useState(0);
  const [s2, sS2] = useState(0);
  const [s3, sS3] = useState(0);
  const [lastTouched, setLastTouched] = useState(null);

  // Once the modal is initially closed, initiate the game
  useEffect(() => {
    if (gameState.stage === 1) {
      sS0(toCombo(gameInfo.startWord)[0]);
      sS1(toCombo(gameInfo.startWord)[1]);
      sS2(toCombo(gameInfo.startWord)[2]);
      sS3(toCombo(gameInfo.startWord)[3]);
      setGameState((p) => ({
        ...p,
        // combo: toCombo(gameInfo.startWord),
        lastCombo: toCombo(gameInfo.startWord),
      }));
    }
    if (gameState.stage > 2) {
      setGameState((p) => ({ ...p, isModalOpen: true }));
    }
  }, [gameState.stage, gameInfo.startWord]);

  // Validate the move when a letter is switched
  useEffect(() => {
    // console.log(gameInfo);
    // Check if the word is valid
    const combo = [s0, s1, s2, s3];
    if (
      gameState.stage === 1 &&
      combo !== toCombo(gameState.usedWords[gameState.usedWords.length - 1])
    ) {
      // Check how many differences there are
      let count = 0;
      combo.forEach((letter, i) => {
        if (
          letter !==
          toCombo(gameState.usedWords[gameState.usedWords.length - 1])[i]
        ) {
          count += 1;
        }
      });

      // console.log(count);

      // Valid move, one letter changed
      if (count === 1) {
        setGameState((p) => {
          const lc = [...combo];
          return { ...p, lastCombo: lc };
        });
      } else if (count > 1) {
        // Figure out the most recently changed index
        let index = 0;
        combo.forEach((letter, i) => {
          if (letter !== gameState.lastCombo[i]) {
            index = i;
          }
        });

        // Revert the other parts of the combo to the valid word besides that index
        setGameState((p) => {
          const n = [...p.lastCombo];
          for (let i = 0; i < n.length; i++) {
            if (i !== index) {
              n[i] = toCombo(
                gameState.usedWords[gameState.usedWords.length - 1]
              )[i];
            }
          }
          return { ...p, combo: n };
        });
      }
    }
    if (
      isValidWord(toWord([s0, s1, s2, s3]), gameInfo.wordList) &&
      toWord(combo) != gameState.usedWords[gameState.usedWords.length - 1]
    ) {
      // Allow the player to commit that move and increment moves
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
    // Check if they got the target word
  }, [s0, s1, s2, s3, gameState.usedWords]);

  // Increment the players moves and update last saved word when they commit a turn
  function handleCommit() {
    const combo = [s0, s1, s2, s3];
    setGameState((p) => {
      // Add new word to used words
      const w = [...p.usedWords];
      w.push(toWord(combo));

      // Increment moves and insert new used words
      return { ...p, moves: p.moves + 1, usedWords: w, isHistoryOpen: false };
    });

    setCanSubmit(false);
  }

  // Check for win or loss
  useEffect(() => {
    if (toWord([s0, s1, s2, s3]) === gameInfo.goldenWord) {
      setGameState((p) => ({ ...p, stage: 3 }));
    } else if (gameState.moves >= 10) {
      setGameState((p) => ({ ...p, stage: 4 }));
    }
  }, [gameState.moves]);

  return (
    <>
      <ModalFrame>
        {/* Display either the welcome content or win content depending on game state */}
        {gameState.stage < 2 ? <TutorialModalContent /> : <EndModalContent />}
      </ModalFrame>
      {gameState.stage > 0 && (
        <div className="h-dvh w-dvw relative flex flex-col justify-between items-center pb-12">
          <div className="w-full flex flex-col gap-6">
            <TopBar />
            <GameHeader
              s0={s0}
              s1={s1}
              s2={s2}
              s3={s3}
              sS0={sS0}
              sS1={sS1}
              sS2={sS2}
              sS3={sS3}
              setLastTouched={setLastTouched}
            />
          </div>
          <div className="w-full">
            <div className="h-[200px] w-full px-8 select-none relative sm:flex sm:flex-col sm:items-center">
              <div className="grid grid-cols-4 h-full w-full sm:w-1/2 relative z-0">
                <LetterSwipe
                  i={0}
                  val={s0}
                  setVal={sS0}
                  combo={[s0, s1, s2, s3]}
                  lastTouched={lastTouched}
                  setLastTouched={setLastTouched}
                />
                <LetterSwipe
                  i={1}
                  val={s1}
                  setVal={sS1}
                  combo={[s0, s1, s2, s3]}
                  lastTouched={lastTouched}
                  setLastTouched={setLastTouched}
                />
                <LetterSwipe
                  i={2}
                  val={s2}
                  setVal={sS2}
                  combo={[s0, s1, s2, s3]}
                  lastTouched={lastTouched}
                  setLastTouched={setLastTouched}
                />
                <LetterSwipe
                  i={3}
                  val={s3}
                  setVal={sS3}
                  combo={[s0, s1, s2, s3]}
                  lastTouched={lastTouched}
                  setLastTouched={setLastTouched}
                />
                {/* <LetterSwipe i={1} />
                <LetterSwipe i={2} />
                <LetterSwipe i={3} /> */}
              </div>
              {!gameState.isModalOpen && (
                <>
                  <div className="overlay-top"></div>
                  <div className="overlay-bottom"></div>
                </>
              )}
            </div>
          </div>
          <div className="relative grid grid-cols-3 place-items-center w-full">
            <div></div>
            <CoolButton
              disabled={!canSubmit}
              last={gameState.usedWords[gameState.usedWords.length - 1]}
              onClick={handleCommit}
              combo={[s0, s1, s2, s3]}
            />
            <button
              className={`cursor-pointer px-4 ${
                gameState.isHistoryOpen ? "text-purple-400" : "text-purple-300"
              }`}
              onClick={() =>
                setGameState((p) => ({
                  ...p,
                  isHistoryOpen: !p.isHistoryOpen,
                }))
              }
            >
              <AnimatePresence>
                {gameState.isHistoryOpen ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    // transition={modalTransition}
                    className="bg-purple-100 p-3 rounded-full"
                  >
                    <X />
                  </motion.div>
                ) : (
                  <div
                    // initial={{ translateY: 30, opacity: 0 }}
                    // animate={{ translateY: 0, opacity: 0 }}
                    // exit={{ translateY: 30, opacity: 0 }}
                    // transition={modalTransition}
                    className="p-3 rounded-full"
                  >
                    <BookText />
                  </div>
                )}
              </AnimatePresence>
            </button>
            <PreviousWords />
          </div>
        </div>
      )}
    </>
  );
}
