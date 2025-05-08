import { useContext, useEffect } from "react";
import { GameStateContext } from "../GameState";
import { useReward } from "react-rewards";
import { RWebShare } from "react-web-share";
import { Link } from "lucide-react";
import { api, emojis, url } from "../config";

export default function EndModalContent() {
  const { reward: confettiReward, isAnimating: isConfettiAnimating } =
    useReward("confettiReward", "confetti");
  const game = useContext(GameStateContext);
  useEffect(() => {
    game.stage === 3 && confettiReward();
  }, []);
  return (
    <div className="flex flex-col h-full items-center justify-between py-8 text-purple-500">
      <p>{game.stage === 3 ? "Nice!" : "Out of moves!"}</p>
      {/* <span id="" className="w-2 h-2 bg-red-500" /> */}
      <div id="confettiReward" className="flex flex-col items-center">
        <p className="text-6xl text-purple-500 font-bold">
          {game.stage === 3 ? game.moves : "You Lose"}
        </p>
        <p className="text-xl text-purple-700 mb-4">
          {game.stage === 3 ? "moves" : "Haha"}
        </p>
        {game.stage === 3 && (
          <>
            <div className="mb-10 mt-3 tracking-widest text-lg flex flex-col items-center gap-1">
              {game.usedWords.map(
                (w, i) =>
                  i > 0 && (
                    <p
                      className={`${
                        i === 0
                          ? "text-neutral-400"
                          : i === game.usedWords.length - 1 &&
                            "text-amber-500 bg-amber-100 box-glow py-1 px-4 rounded-2xl border-2 border-amber-200"
                      }`}
                    >
                      {w}
                    </p>
                  )
              )}
            </div>
            <RWebShare
              data={{
                url: url,
                title: `Got it in ${game.moves} move${
                  game.moves > 1 ? "s" : ""
                }!`,
                text: `Got it in ${game.moves} move${
                  game.moves > 1 ? "s" : ""
                }!`,
              }}
            >
              <button className="plausible-event-name=share cursor-pointer flex bg-purple-400 border-2 button-glow border-purple-300 text-white rounded-2xl px-3 py-1 flex-row items-center justify-center gap-1">
                <Link size={20} /> share
              </button>
            </RWebShare>
          </>
        )}
      </div>
      <p className="text-neutral-400 text-sm">
        Come back tomorrow for a new challenge!
      </p>
    </div>
  );
}
