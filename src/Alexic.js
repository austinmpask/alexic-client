import { useState } from "react";
import { toCombo } from "./utils";
import { s } from "motion/react-client";

export function useGame() {
  const [startWord, setStartWord] = useState("");
  const [goldenWord, setGoldenWord] = useState("");
  const [example, setExample] = useState("");
  const [badExample, setBadExample] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [alphabet, setAlphabet] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  );
  const [wordList, setWordList] = useState(new Set([]));
  const [usedWords, setUsedWords] = useState([]);
  const [combo, setCombo] = useState([0, 0, 0, 0]);
  const [moves, setMoves] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);
  const [stage, setStage] = useState(0);
  const [maxMoves, setMaxMoves] = useState(10);

  //   Update the combo at only one index
  function setComboAt(i, newNum) {
    setCombo((p) => p.map((num, index) => (index === i ? newNum : num)));
  }

  //   Increment game moves and return new amount
  function move() {
    const currentMoves = moves;
    setMoves((p) => p + 1);
    return currentMoves + 1;
  }

  //   Soft reset the game and populate new values
  function init(start, golden, ex, badEx, diff, wL) {
    // Mark game as loading
    setIsLoading(true);
    // Set up the game

    // Format the difficulty from api to be readable
    let diffString = "";
    switch (diff) {
      case "e":
        diffString = "easy";
        break;
      case "m":
        diffString = "medium";
        break;
      case "h":
        diffString = "hard";
        break;
    }
    setDifficulty(diffString);

    // Word list usually wont need to be updated on new round
    wL && setWordList(new Set(wL));
    setStartWord(start);
    setGoldenWord(golden);
    setExample(ex);
    setBadExample(badEx);
    setCanSubmit(false);

    setUsedWords([start]);
    // Make order more react-y if this doesnt work properly
    setIsLoading(false);
  }

  //   Un roll the combo to the start word
  function unRoll() {
    const wToC = toCombo(startWord);
    setCombo(wToC);
  }

  function getLastWord(i = 1) {
    return usedWords[usedWords.length - i];
  }

  function pushWord(word) {
    setUsedWords((p) => {
      const prev = [...p];
      prev.push(word);
      return prev;
    });
  }

  function popWord() {
    const w = getLastWord();
    setUsedWords((p) => {
      const prev = [...p];
      prev.pop();
      return prev;
    });
    return w;
  }

  return {
    setComboAt,
    setCombo,
    combo,
    startWord,
    setStartWord,
    goldenWord,
    setGoldenWord,
    example,
    setExample,
    setBadExample,
    difficulty,
    setDifficulty,
    alphabet,
    setAlphabet,
    wordList,
    setWordList,
    moves,
    setMoves,
    isLoading,
    setIsLoading,
    init,
    unRoll,
    stage,
    setStage,
    badExample,
    usedWords,
    canSubmit,
    getLastWord,
    move,
    canSubmit,
    setCanSubmit,
    pushWord,
    maxMoves,
    popWord,
  };
}
