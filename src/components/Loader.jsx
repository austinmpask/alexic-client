import { Pyramid } from "lucide-react";
import Logo from "./Logo";

export default function Loader() {
  return (
    <div className="my-14 flex flex-col items-center justify-center">
      <Pyramid
        style={{
          animation: "wiggle 1.5s infinite ease",
        }}
        size={42}
        className="text-purple-300"
      />
      <Logo />
    </div>
  );
}
