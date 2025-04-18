import "swiper/css";
import CoolButton from "./CoolButton";
import LetterSwipe from "./LetterSwipe";
import ReactConfetti from "react-confetti";
import ReactModal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import { api, emojis, url } from "./config";
import { isValidWord, toCombo, toWord } from "./utils";

import {
  Check,
  CircleHelp,
  Flame,
  Link,
  MoveDown,
  MoveRight,
  Pyramid,
  Undo,
  WandSparkles,
  X,
} from "lucide-react";
import ModalFrame from "./components/ModalFrame";
import TutorialModalContent from "./components/TutorialModalContent";
import { GameStateContext } from "./GameState";
import TopBar from "./components/TopBar";
import GameHeader from "./components/GameHeader";
import EndModalContent from "./components/EndModalContent";

// Import Swiper styles

export default function App() {
  const { gameState, gameInfo, setGameState } = useContext(GameStateContext);
  const [canSubmit, setCanSubmit] = useState(false);

  // Once the modal is initially closed, initiate the game
  useEffect(() => {
    if (gameState.stage === 1) {
      setGameState((p) => ({
        ...p,
        combo: toCombo(gameInfo.startWord),
        lastCombo: toCombo(gameInfo.startWord),
      }));
    }
    if (gameState.stage > 2) {
      setGameState((p) => ({ ...p, isModalOpen: true }));
    }
  }, [gameState.stage, gameInfo.startWord]);

  // Validate the move when a letter is switched
  useEffect(() => {
    console.log(gameInfo);
    // Check if the word is valid
    if (
      gameState.stage === 1 &&
      gameState.combo !==
        toCombo(gameState.usedWords[gameState.usedWords.length - 1])
    ) {
      // Check how many differences there are
      let count = 0;
      gameState.combo.forEach((letter, i) => {
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
          const lc = [...gameState.combo];
          return { ...p, lastCombo: lc };
        });
      } else if (count > 1) {
        // Figure out the most recently changed index
        let index = 0;
        gameState.combo.forEach((letter, i) => {
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
      isValidWord(toWord(gameState.combo), gameInfo.wordList) &&
      toWord(gameState.combo) !=
        gameState.usedWords[gameState.usedWords.length - 1]
    ) {
      // Allow the player to commit that move and increment moves
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
    // Check if they got the target word
  }, [gameState.combo, gameState.usedWords]);

  // Increment the players moves and update last saved word when they commit a turn
  function handleCommit() {
    setGameState((p) => {
      // Add new word to used words
      const w = [...p.usedWords];
      w.push(toWord(gameState.combo));

      // Increment moves and insert new used words
      return { ...p, moves: p.moves + 1, usedWords: w };
    });

    setCanSubmit(false);
  }

  // Check for win or loss
  useEffect(() => {
    if (toWord(gameState.combo) === gameInfo.goldenWord) {
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
          <div className="w-full flex flex-col gap-4">
            <TopBar />
            <GameHeader />
          </div>
          <div className="w-full">
            <div className="h-[200px] w-full px-8 select-none relative sm:flex sm:flex-col sm:items-center">
              <div className="grid grid-cols-4 h-full w-full sm:w-1/2 relative z-0">
                <LetterSwipe i={0} val={gameState.combo} />
                <LetterSwipe i={1} val={gameState.combo} />
                <LetterSwipe i={2} val={gameState.combo} />
                <LetterSwipe i={3} val={gameState.combo} />
              </div>
              {!gameState.isModalOpen && (
                <>
                  <div className="overlay-top"></div>
                  <div className="overlay-bottom"></div>
                </>
              )}
            </div>
          </div>
          <CoolButton
            disabled={!canSubmit}
            last={gameState.usedWords[gameState.usedWords.length - 1]}
            onClick={handleCommit}
          />
        </div>
      )}
    </>
  );
}
