import "swiper/css";
import CoolButton from "./CoolButton";
import LetterSwipe from "./LetterSwipe";
import ReactConfetti from "react-confetti";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
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

// Import Swiper styles

export default function App() {
  // Get todays puzzle
  const [wordList, setWordList] = useState(new Set());
  // const gameWords = games[dateFormat(new Date())];
  const [startWord, setStartWord] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [target, setTarget] = useState("");
  const [example, setExample] = useState("");
  const [badExample, setBadExample] = useState("");
  const [diff, setDiff] = useState("easy");
  // const [color, setColor] = useState("green");
  const [moves, setMoves] = useState(0);
  const [modal, setModal] = useState(true);
  const [gameState, setGameState] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [usedWords, setUsedWords] = useState([]);
  const [combo, setCombo] = useState([0, 0, 0, 0]);
  const [lastCombo, setLastCombo] = useState([0, 0, 0, 0]);
  const [winText, setWinText] = useState("");

  useEffect(() => {
    async function getWords() {
      const resp = await fetch(api + "words");

      const wordJson = await resp.json();
      setWordList(new Set(wordJson.words));
    }
    async function getPuzzle() {
      const resp = await fetch(api + "puzzle");

      const puzzle = await resp.json();
      // setWordList(new Set(wordJson.words));
      setTarget(puzzle.golden);
      setUsedWords([puzzle.start]);
      setStartWord(puzzle.start);
      setExample(puzzle.example);
      setBadExample(puzzle.incorrect);

      switch (puzzle.difficulty) {
        case "e":
          setDiff("easy");
          // setColor("green");
          break;
        case "m":
          setDiff("medium");
          // setColor("yellow");
          break;
        case "h":
          setDiff("hard");
          break;
      }
      setTimeout(() => {
        setLoaded(true);
      }, 600);
    }
    getWords();
    getPuzzle();
  }, []);
  useEffect(() => {
    if (gameState === 1) {
      setCombo(toCombo(startWord));
      setLastCombo(toCombo(startWord));
    }
    if (gameState > 2) {
      setModal(true);
    }
  }, [gameState, startWord]);

  useEffect(() => {
    // Check if the word is valid

    if (gameState === 1 && combo !== toCombo(usedWords[usedWords.length - 1])) {
      // Check how many differences there are
      let count = 0;
      combo.forEach((letter, i) => {
        if (letter !== toCombo(usedWords[usedWords.length - 1])[i]) {
          count += 1;
        }
      });

      // console.log(count);

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
      isValidWord(toWord(combo), wordList) &&
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
      // console.log("reverted");
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
      let s = "";
      for (let i = 0; i < moves; i++) {
        s += emojis[1];
      }

      for (let i = 0; i < 10 - moves; i++) {
        s += emojis[0];
      }
      setWinText(s);
      setGameState(3);
    } else if (moves >= 10) {
      setGameState(4);
    }
  }, [moves]);

  useEffect(() => {
    // console.log(usedWords);
  }, [usedWords]);
  return (
    <div className="pb-10 h-dvh w-dvw relative">
      <ReactModal isOpen={modal} className={"welcome-modal"}>
        <div className="shadow flex flex-col items-center justify-center alc-modal gap-6 border-neutral-50 border-2 h-[90%] w-[90%] sm:w-1/2 text-center text-neutral-950 text-lg rounded-4xl bg-white py-5 px-5">
          {gameState < 2 ? (
            <>
              {/* <img src="10switches.svg" className="h-18 w-auto" /> */}

              {loaded ? (
                <>
                  <p className="text-4xl text-purple-400 select-none font-semibold">
                    a<span className="text-purple-900">lex</span>ic
                  </p>
                  <div className="flex-col flex items-center gap-5 text-sm text-neutral-500">
                    <div>
                      <p>Create new words from the starting</p>
                      <p>word to eventually turn it into today's </p>
                      <p className="text-amber-500 mt-1 glow inline-flex items-center font-semibold">
                        <Pyramid size={18} className="mr-1" /> Golden Word
                      </p>
                      {/* <p>one-by-one to turn it into today's codeword</p> */}
                      {/* <span className="text-blue-500 mt-1 box-glow inline-flex items-center bg-blue-100 border-blue-200 border-2 rounded-2xl font-semibold tracking-widest py-2 px-3">
                    <KeyRound size={18} className="mr-1" /> {gameWords[1]}
                  </span> */}
                    </div>
                    <div className="font-semibold tracking-widest flex flex-col items-center text-lg text-neutral-950 gap-2 mb-2">
                      <span className="text-lg tracking-widest">
                        {startWord}
                      </span>
                      <MoveDown size={18} />
                      <span className="text-amber-500 mt-1 box-glow inline-flex items-center bg-amber-100 border-amber-200 border-2 rounded-2xl font-semibold tracking-widest py-2 px-3">
                        <Pyramid size={18} className="mr-1" /> {target}
                      </span>
                    </div>
                    <div>
                      <p>New words are created by changing </p>
                      <p>
                        <span className="font-bold text-neutral-950">one</span>{" "}
                        letter of the current word
                      </p>
                      {/* <p>a new valid English word</p> */}
                    </div>
                    <div className="grid grid-cols-3 place-items-center text-lg text-neutral-950 w-4/6 font-semibold tracking-widest">
                      <p className="w-full text-right">{startWord}</p>
                      <MoveRight />
                      <p className="w-full text-left relative">
                        <span className="text-green-500">{example[0]}</span>
                        {example.substring(1)}
                        <Check
                          className="absolute text-green-500 top-[3px] -right-8"
                          size={20}
                        />
                      </p>
                      <p className="w-full text-right">{startWord}</p>
                      <MoveRight />
                      <p className="w-full text-left relative">
                        <span className="text-rose-500">{badExample[0]}</span>
                        {badExample.substring(1)}
                        <X
                          className="absolute text-rose-500 top-[3px] -right-8"
                          size={20}
                        />
                      </p>
                    </div>
                    <div>
                      <p>
                        Can you turn{" "}
                        <span className="text-neutral-950 font-bold">
                          {startWord.toLowerCase()}
                        </span>{" "}
                        into{" "}
                        <span className="font-bold text-amber-500">
                          {target.toLowerCase()}
                        </span>{" "}
                      </p>
                      <p>in under 10 transformations?</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setModal(false);
                      gameState === 0 && setGameState(1);
                    }}
                    className={`${
                      gameState === 0 ? "plausible-event-name=play" : ""
                    } bg-purple-400 border-2 border-purple-300 py-3 cursor-pointer px-6 text-xl rounded-2xl text-white`}
                  >
                    {gameState === 0 ? "Play" : "Back"}
                  </button>
                </>
              ) : (
                <div className="my-14 flex flex-col items-center justify-center">
                  <Pyramid
                    style={{
                      animation: "wiggle 1.5s infinite ease",
                    }}
                    size={42}
                    className="text-purple-300"
                  />
                  <p className="text-4xl text-purple-400 select-none font-semibold">
                    a<span className="text-purple-900">lex</span>ic
                  </p>
                </div>
              )}
            </>
          ) : gameState === 3 ? (
            <>
              {/* <img src="10switches.png" className="h-24 w-auto" /> */}
              <div className="flex-col flex w-full items-center gap-3">
                <span className="text-2xl font-semibold text-amber-500 glow inline-flex items-center">
                  <WandSparkles size={20} className="mr-1" /> You Win!!!
                  <ReactConfetti opacity={0.6} />
                </span>
                <img className="rounded-2xl" src="cat.gif" />
                <div className="grid gap-1 grid-cols-10 h-2 w-full sm:w-1/2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full ${
                        i < moves ? "bg-purple-400" : "bg-neutral-300"
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-3xl text-purple-500 font-semibold mt-2">
                  {moves} {moves > 1 ? "Moves" : "Move"}
                </p>
                <div className="flex flex-row gap-2 mb-2 items-center justify-center">
                  <RWebShare
                    data={{
                      url: url,
                      title: `Got it in ${moves} move${moves > 1 ? "s" : ""}!`,
                      text: `${winText}`,
                    }}
                  >
                    <button className="plausible-event-name=share cursor-pointer flex bg-purple-400 border-2 button-glow border-purple-300 text-white rounded-2xl px-3 py-1 flex-row items-center justify-center gap-1">
                      <Link size={20} /> Share
                    </button>
                  </RWebShare>
                </div>
                <div></div>
                <p className="text-sm text-neutral-500">
                  Come back tomorrow for a new challenge :)
                </p>
              </div>
            </>
          ) : (
            <>
              {/* <img src="10switches.png" className="h-24 w-auto" /> */}
              <div className="flex-col flex w-full items-center gap-3">
                <span className="text-xl font-semibold inline-flex items-center">
                  You Lose :(
                </span>
                <img className="rounded-2xl" src="sadcat.png" />
                <div className="grid gap-1 grid-cols-10 h-2 w-full sm:w-1/2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full ${"bg-purple-400"}`}
                    ></div>
                  ))}
                </div>

                <div className="flex flex-row gap-2 mb-2 items-center justify-center">
                  <RWebShare
                    disableNative={true}
                    data={{
                      url: url,
                      title: "I suck at Alexic",
                      text: "I suck at Alexic",
                    }}
                  >
                    <button className="plausible-event-name=share cursor-pointer flex bg-purple-400 border-2 button-glow border-purple-300 text-white rounded-2xl px-3 py-1 flex-row items-center justify-center gap-1">
                      <Link size={20} /> Share
                    </button>
                  </RWebShare>
                </div>
                <div></div>
                <p className="text-sm text-neutral-500">
                  Come back tomorrow for a new challenge :)
                </p>
              </div>
            </>
          )}
        </div>
      </ReactModal>

      <div className="w-full flex flex-row">
        <div
          className={` text-sm px-2 py-1 text-purple-400 bg-purple-100 rounded-r-full flex-row flex justify-center w-fit items-center`}
        >
          <Flame size={14} />
          <span>{diff}</span>
        </div>
        {/* <div className="rounded-l-full w-full bg-purple-100 border-2 border-purple-200 p-1">
          <div
            className={`bg-purple-400 transition-all ${
              "w-" + moves + "/10"
            } text-white text-sm h-full rounded-full text-right px-2flex flex-row justify-end items-center`}
          >
            <span>{moves}</span>
          </div>
        </div> */}
        <div className="grid gap-1.5 grid-cols-10 w-full items-center px-3">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`w-4.5 h-4.5 rounded-full border-2 ${
                i < moves
                  ? "bg-purple-400 border-purple-300"
                  : "bg-purple-100 border-purple-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="py-10 h-full flex flex-col w-full items-center justify-between">
        <div className="w-full flex-col flex items-center gap-2">
          <div className="flex flex-row w-full justify-between px-5">
            <button
              className={`cursor-pointer px-4 ${
                usedWords.length > 1 ||
                toWord(combo) !== usedWords[usedWords.length - 1]
                  ? "text-neutral-950"
                  : "text-neutral-300"
              }`}
              onClick={handleUndo}
            >
              <Undo />
            </button>
            <div className="select-none border-2 box-glow border-amber-200 bg-amber-100 rounded-3xl text-lg font-semibold tracking-widest flex flex-row items-center justify-center gap-2 text-amber-500 py-3 px-4">
              <Pyramid size={20} />
              {target}
            </div>
            <button
              onClick={() => setModal(true)}
              className="px-4 cursor-pointer"
            >
              <CircleHelp />
            </button>
          </div>
        </div>
        <div className="h-[200px] w-full px-8 select-none relative sm:flex sm:flex-col sm:items-center">
          <div className="grid grid-cols-4 h-full w-full sm:w-1/2 relative z-0">
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
