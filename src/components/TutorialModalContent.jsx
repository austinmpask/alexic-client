import { Check, MoveDown, MoveRight, Pyramid, X } from "lucide-react";
import { useContext } from "react";
import { GameStateContext } from "../GameState";

export default function TutorialModalContent() {
  const game = useContext(GameStateContext);
  return (
    <div className="flex-col flex items-center gap-6 text-sm sm:text-lg xl:text-xl text-neutral-500">
      <div className="flex flex-col items-center">
        <p>Create new words from the starting</p>
        <p>word to eventually turn it into today's </p>
        <p className="text-amber-500 mt-1 glow inline-flex items-center font-semibold">
          <Pyramid size={18} className="mr-1" /> Golden Word
        </p>
      </div>
      <div className="font-semibold tracking-widest flex flex-col items-center text-lg text-neutral-950 gap-2 mb-2">
        <span className="text-lg tracking-widest">{game.startWord}</span>
        <MoveDown size={18} />
        <span className="text-amber-500 mt-1 box-glow inline-flex items-center bg-amber-100 border-amber-200 border-2 rounded-2xl font-semibold tracking-widest py-2 px-3">
          <Pyramid size={18} className="mr-1" /> {game.goldenWord}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <p>New words are created by changing </p>
        <p>
          <span className="font-bold text-neutral-950">one</span> letter of the
          current word
        </p>
        {/* <p>a new valid English word</p> */}
      </div>
      <div className="grid grid-cols-3 place-items-center text-lg text-neutral-950 w-4/6 font-semibold tracking-widest">
        <p className="w-full text-right">{game.startWord}</p>
        <MoveRight />
        <p className="w-full text-left relative">
          <span className="text-green-500">{game.example[0]}</span>
          {game.example.substring(1)}
          <Check
            className="absolute text-green-500 top-[3px] -right-8"
            size={20}
          />
        </p>
        <p className="w-full text-right">{game.startWord}</p>
        <MoveRight />
        <p className="w-full text-left relative">
          <span className="text-rose-500">{game.badExample[0]}</span>
          {game.badExample.substring(1)}
          <X className="absolute text-rose-500 top-[3px] -right-8" size={20} />
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p>
          Can you turn{" "}
          <span className="text-neutral-950 font-bold">
            {game.startWord.toLowerCase()}
          </span>{" "}
          into{" "}
          <span className="font-bold text-amber-500">
            {game.goldenWord.toLowerCase()}
          </span>{" "}
        </p>
        <p>in under 10 transformations?</p>
      </div>
    </div>
  );
}
