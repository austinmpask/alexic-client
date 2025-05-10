import "swiper/css";
import CoolButton from "./CoolButton";
import EndModalContent from "./components/EndModalContent";
import GameHeader from "./components/GameHeader";
import HelpFinger from "./components/HelpFinger";
import LetterSwipe from "./LetterSwipe";
import ModalFrame from "./components/ModalFrame";
import PreviousWords from "./components/PreviousWords";
import TopBar from "./components/TopBar";
import TutorialModalContent from "./components/TutorialModalContent";
import { BookText, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { GameStateContext } from "./GameState";
import { UIContext } from "./UIState";
import { isValidWord, toCombo, toWord } from "./utils";

export default function App() {
  const game = useContext(GameStateContext);
  const { isHistoryOpen, toggleHistory, closeHistory, greyLetters, openModal } =
    useContext(UIContext);

  const [playerStuck, setPlayerStuck] = useState(true);
  const [finger, setFinger] = useState(false);

  // const guideRef = useRef();

  // useEffect(() => {
  //   game.moves === 2 && game.setStage(4);
  // }, [game.moves]);

  // Once the modal is initially closed, initiate the game
  useEffect(() => {
    if (game.stage === 1) {
      game.unRoll();
      // Guide player if they are stuck
      setTimeout(() => {
        guidePlayer();
      }, 6000);
    }
    if (game.stage === 3 || game.stage === 4) {
      setTimeout(() => {
        openModal();
      }, 200);
    }
  }, [game.stage, game.startWord]);

  useEffect(() => {
    // Once player swipes a swiper, assume they know how to play
    if (
      playerStuck &&
      toWord(game.combo) !== "AAAA" &&
      toWord(game.combo) !== game.startWord
    ) {
      setPlayerStuck(false);
    }
  }, [game.combo]);

  function guidePlayer() {
    playerStuck && setFinger(true);
  }
  // Validate the move when a letter is switched
  useEffect(() => {
    // Check if the word is valid
    if (game.stage === 1 && game.combo !== toCombo(game.getLastWord())) {
      // Check how many differences there are
      let count = 0;
      game.combo.forEach((num, i) => {
        if (num !== toCombo(game.getLastWord())[i]) {
          count += 1;
        }
      });

      // Valid move, one letter changed
      if (
        count === 1 &&
        isValidWord(toWord(game.combo), game.wordList) &&
        toWord(game.combo) != game.getLastWord()
      ) {
        // Allow the player to commit that move and increment moves
        game.setCanSubmit(true);
      } else {
        game.setCanSubmit(false);
      }
    }
    // Check if they got the target word
  }, [game.combo, game.usedWords]);

  // Increment the players moves and update last saved word when they commit a turn
  function handleCommit() {
    game.move();
    closeHistory();
    game.pushWord(toWord(game.combo));
  }

  // Check for win or loss
  useEffect(() => {
    if (toWord(game.combo) === game.goldenWord) {
      game.setStage(3);
    } else if (game.moves >= game.maxMoves) {
      game.setStage(4);
    }
  }, [game.moves]);

  return (
    <>
      <ModalFrame>
        {/* Display either the welcome content or win content depending on game state */}
        {game.stage < 2 ? <TutorialModalContent /> : <EndModalContent />}
      </ModalFrame>
      {game.stage > 0 && (
        <div className="h-dvh w-dvw relative flex flex-col justify-between items-center pb-12">
          <div className="w-full sm:w-3/4 lg:w-3/5 xl:w-1/2 flex flex-col gap-6">
            <TopBar />
            <GameHeader />
          </div>
          <div className="w-full">
            <div className="h-[200px] sm:h-[400px] w-full px-8 select-none relative sm:flex sm:flex-col sm:items-center">
              {playerStuck && finger && <HelpFinger />}
              <div className="grid grid-cols-4 h-full w-full sm:w-1/2 lg:w-1/3 relative z-0">
                <LetterSwipe i={0} />
                <LetterSwipe i={1} />
                <LetterSwipe i={2} />
                <LetterSwipe i={3} />
              </div>
              <AnimatePresence>
                {greyLetters && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="overlay-top"></div>
                    <div className="overlay-bottom"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="relative grid grid-cols-3 place-items-center w-full sm:w-3/4 lg:w-3/5 xl:w-1/2">
            <div></div>
            <CoolButton onClick={handleCommit} />
            <button
              className={`cursor-pointer px-4 ${
                isHistoryOpen ? "text-purple-400" : "text-purple-300"
              }`}
              onClick={toggleHistory}
            >
              <AnimatePresence>
                {isHistoryOpen ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="bg-purple-100 p-3 rounded-full"
                  >
                    <X />
                  </motion.div>
                ) : (
                  <div className="p-3 rounded-full">
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
