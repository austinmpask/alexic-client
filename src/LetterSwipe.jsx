import "swiper/css";
import { useContext, useEffect, useRef } from "react";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GameStateContext } from "./GameState";
import { alphabet } from "./config";

export default function LetterSwipe({ i }) {
  const { gameState, setGameState } = useContext(GameStateContext);
  const swiperRef = useRef(null);
  const prevVal = useRef(gameState.combo[i]);
  const slideIndex = gameState.combo[i] === 0 ? 25 : gameState.combo[i] - 1;
  // Only update when val[i] changes from outside
  useEffect(() => {
    if (swiperRef.current && prevVal.current !== gameState.combo[i]) {
      // Update without triggering events
      console.log(gameState.combo);
      swiperRef.current.slideTo(
        gameState.combo[i] + 3 === 0 ? 25 : gameState.combo[i] + 2,
        450
      );
      prevVal.current = gameState.combo[i];
    }
  }, [gameState.combo, i, slideIndex]);

  const handleSlideChange = (swiper) => {
    // Only update if the change is from user interaction
    if (prevVal.current === gameState.combo[i]) {
      const newVal = swiper.realIndex === 25 ? 0 : swiper.realIndex + 1;
      if (newVal !== gameState.combo[i]) {
        setGameState((old) => ({
          ...old,
          combo: old.combo.map((item, index) => (index === i ? newVal : item)),
        }));
        prevVal.current = newVal;
      }
    }
  };

  return (
    <Swiper
      className="h-full w-full text-2xl"
      spaceBetween={0}
      initialSlide={slideIndex}
      direction={"vertical"}
      modules={[Virtual]}
      loop={true}
      slidesPerView={3}
      virtual
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={handleSlideChange}
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
