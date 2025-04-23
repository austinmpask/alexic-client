import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GameStateProvider from "./GameState.jsx";
import UIProvider from "./UIState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameStateProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </GameStateProvider>
  </StrictMode>
);
