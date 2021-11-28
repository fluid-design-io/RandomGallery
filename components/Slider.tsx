import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

function Slider({
  onSelect,
  prefix,
  type,
  posts,
}: {
  onSelect: (post) => void;
  prefix?: string;
  type?: "memories" | "featured";
  posts;
}) {
  return (
    <div className="pt-2">
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        grabCursor
        allowTouchMove
        /* onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)} */
      >
        {posts.map(
          (p, i) =>
            i < 6 && (
              <SwiperSlide
                key={`${p.id}-${i}`}
                className="!w-[calc(100%-60px)] sm:!w-[320px] flex justify-center items-center ml-4 sm:ml-4"
              >
                <Card
                  post={p}
                  onSelect={onSelect}
                  prefix={prefix}
                  type={type}
                />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
}

export default Slider;
