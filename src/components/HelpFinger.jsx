import { motion } from "motion/react";

export default function HelpFinger() {
  const fingerVariants = {
    initial: {
      top: "20%",
      opacity: 0,
      scale: 1,
    },
    appear: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.8,
      transition: {
        duration: 0.2,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
    swipe: {
      top: "80%",
      transition: {
        duration: 0.6,
        delay: 1.0,
        ease: "easeOut",
      },
    },
  };
  return (
    // <div className="w-4 h-4 bg-red-500 absolute left-1/5 top-1/5 z-20 pointer-events-none select-none"></div>
    <motion.div
      variants={fingerVariants}
      initial="initial"
      animate={["appear", "tap", "swipe"]}
      className="absolute left-1/5 z-20 -rotate-45 pointer-events-none select-none"
    >
      <img src="finger.svg" className="w-12 h-12" />
    </motion.div>
  );
}
