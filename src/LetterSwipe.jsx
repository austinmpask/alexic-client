import "swiper/css";
import { useContext, useEffect, useRef, useState } from "react";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GameStateContext } from "./GameState";
import { alphabet } from "./config";
import { toSliderIndex, toRawIndex, toCombo } from "./utils";

export default function LetterSwipe({
  i,
  val,
  setVal,
  lastTouched,
  setLastTouched,
}) {
  // Ref for this slider instance
  const swiperRef = useRef(null);

  const { gameState } = useContext(GameStateContext);

  // Convert the raw index to the adjusted slider display index
  const slideIndex = toSliderIndex(val);

  useEffect(() => {
    if (swiperRef.current && lastTouched !== i) {
      const w = toCombo(gameState.usedWords[gameState.usedWords.length - 1])[i];
      swiperRef.current.slideTo(w + 3 === 0 ? 25 : w + 2, 450);
    }
  }, [lastTouched, val, gameState.usedWords]);

  const handleSlideChange = (swiper) => {
    setVal(toRawIndex(swiper.realIndex));
    // setLastTouched(i);
  };

  return (
    <Swiper
      className="h-full w-full text-2xl"
      spaceBetween={0}
      initialSlide={slideIndex} // Set the slider to start on the adjusted index provided
      direction={"vertical"}
      modules={[Virtual]}
      loop={true}
      slidesPerView={3}
      virtual
      onSwiper={(swiper) => {
        swiperRef.current = swiper; // Save this swiper index
      }}
      onSlideChange={handleSlideChange}
      onTouchStart={() => setLastTouched(i)}
      onAnimationEnd={() => setLastTouched(null)}
    >
      {alphabet.map((l, index) => (
        <SwiperSlide key={l} virtualIndex={index}>
          <div className="h-full w-full text-center flex flex-col justify-center">
            <p>{l}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
