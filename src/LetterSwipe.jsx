import "swiper/css";
import { useContext, useEffect, useRef, useState } from "react";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GameStateContext } from "./GameState";
import { alphabet } from "./config";
import { toSliderIndex, toRawIndex, toCombo } from "./utils";
import { UIContext } from "./UIState";

export default function LetterSwipe({ i }) {
  // Ref for this slider instance
  const swiperRef = useRef(null);

  const game = useContext(GameStateContext);
  const { isHistoryOpen, closeHistory, lastTouched, touch } =
    useContext(UIContext);

  // Convert the raw index to the adjusted slider display index
  const slideIndex = toSliderIndex(game.combo[i]);

  useEffect(() => {
    if (swiperRef.current && lastTouched !== i) {
      const w = toCombo(game.getLastWord())[i];
      swiperRef.current.slideTo(w + 3 === 0 ? 25 : w + 2, 450);
    }
    isHistoryOpen && closeHistory();
  }, [lastTouched, game.combo, game.usedWords]);

  const handleSlideChange = (swiper) => {
    game.setComboAt(i, toRawIndex(swiper.realIndex));
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
      onTouchStart={() => touch(i)}
      onAnimationEnd={() => touch(null)}
    >
      {game.alphabet.map((l, index) => (
        <SwiperSlide key={l} virtualIndex={index}>
          <div className="h-full w-full text-center flex flex-col justify-center">
            <p>{l}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
