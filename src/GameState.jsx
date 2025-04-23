import { createContext, useEffect, useState } from "react";
import { api } from "./config";
import { useGame } from "./Alexic";

export const GameStateContext = createContext();

export default function GameStateProvider({ children }) {
  const game = useGame();

  //   Get todays puzzle info
  useEffect(() => {
    async function getPuzzle() {
      const wordResp = await fetch(api + "words");
      const puzzleResp = await fetch(api + "puzzle");

      const wordJson = await wordResp.json();
      const puzzleJson = await puzzleResp.json();

      // Initialize game with the stuff from API
      game.init(
        puzzleJson.start,
        puzzleJson.golden,
        puzzleJson.example,
        puzzleJson.incorrect,
        puzzleJson.difficulty,
        wordJson.words
      );
    }
    getPuzzle();
  }, []);

  return (
    <GameStateContext.Provider value={game}>
      {children}
    </GameStateContext.Provider>
  );
}
