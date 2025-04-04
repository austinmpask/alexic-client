import "swiper/css";
import { useEffect, useRef } from "react";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { alphabet } from "./config";

export default function LetterSwipe({ i, val, setVal }) {
  const swiperRef = useRef(null);
  const prevVal = useRef(val[i]);
  const slideIndex = val[i] === 0 ? 25 : val[i] - 1;

  // Only update when val[i] changes from outside
  useEffect(() => {
    if (swiperRef.current && prevVal.current !== val[i]) {
      // Update without triggering events
      console.log(val);
      swiperRef.current.slideTo(val[i] + 3 === 0 ? 25 : val[i] + 2, 450);
      prevVal.current = val[i];
    }
  }, [val, i, slideIndex]);

  const handleSlideChange = (swiper) => {
    // Only update if the change is from user interaction
    if (prevVal.current === val[i]) {
      const newVal = swiper.realIndex === 25 ? 0 : swiper.realIndex + 1;
      if (newVal !== val[i]) {
        setVal((old) =>
          old.map((item, index) => (index === i ? newVal : item))
        );
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
