import { createContext, useEffect, useState } from "react";
import { api } from "./config";

export const GameStateContext = createContext();

export default function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState({
    stage: 0,
    moves: 0,
    // combo: [0, 0, 0, 0],
    lastCombo: [0, 0, 0, 0],
    usedWords: [],
    isLoading: true,
    isModalOpen: true,
  });
  const [gameInfo, setGameInfo] = useState({
    wordList: new Set([]),
    startWord: "",
    goldenWord: "",
    example: "",
    badExample: "",
    difficulty: "",
  });

  //   Get todays puzzle info
  useEffect(() => {
    async function getPuzzle() {
      const wordResp = await fetch(api + "words");
      const puzzleResp = await fetch(api + "puzzle");

      const wordJson = await wordResp.json();
      const puzzleJson = await puzzleResp.json();

      let diffString = "";
      switch (puzzleJson.difficulty) {
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

      setGameInfo((p) => ({
        ...p,
        wordList: new Set(wordJson.words),
        startWord: puzzleJson.start,
        goldenWord: puzzleJson.golden,
        example: puzzleJson.example,
        badExample: puzzleJson.incorrect,
        difficulty: diffString,
      }));
      setGameState((p) => ({ ...p, usedWords: [puzzleJson.start] }));
    }
    getPuzzle();
  }, []);

  //   Mark as loaded once game info has been populated
  useEffect(() => {
    // console.log(gameInfo);
    gameInfo.startWord !== "" &&
      setTimeout(() => {
        setGameState((p) => ({ ...p, isLoading: false }));
      }, 500);
  }, [gameInfo]);

  return (
    <GameStateContext.Provider value={{ gameState, gameInfo, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
}
