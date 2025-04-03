import { Lock, LockOpen } from "lucide-react";

export default function CoolButton({ text, last, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`select-none group gap-1 relative inline-flex h-16 items-center justify-center overflow-hidden rounded-3xl px-12 font-medium transition ${
        !disabled
          ? "scale-110 bg-green-400 text-white cursor-pointer"
          : "bg-neutral-400 text-neutral-200"
      }`}
    >
      {disabled ? <Lock size={15} /> : <LockOpen size={15} />}
      <span className="text-lg">{disabled ? last : text}</span>
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
