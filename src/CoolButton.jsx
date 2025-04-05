import { WandSparkles } from "lucide-react";

export default function CoolButton({ text, last, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`select-none group gap-1 relative inline-flex h-16 items-center justify-center overflow-hidden rounded-3xl py-3 px-4 font-medium transition ${
        !disabled
          ? "scale-110 bg-purple-400 button-glow border-purple-300 border-2 text-white cursor-pointer"
          : "bg-neutral-300 border-2 border-neutral-300 text-neutral-100"
      }`}
    >
      {disabled ? <WandSparkles size={17} /> : <WandSparkles size={17} />}
      <span className="text-lg tracking-widest">{disabled ? last : text}</span>
      <div
        className={`absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] ${
          !disabled && "duration-1000 [transform:skew(-12deg)_translateX(100%)]"
        }`}
      >
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </button>
  );
}
