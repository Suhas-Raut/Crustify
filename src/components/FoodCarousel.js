import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function FoodCarousel({ items }) {
  return (
    <div className="food-carousel" style={{ margin: "20px 0" }}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 3000, // same as your working version
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          340: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          868: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="carousel-card"
              style={{
                position: "relative",
                height: "180px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src={item.img || "/placeholder.png"}
                alt={item.title || item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  color: "white",
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.73), transparent)",
                  padding: "8px",
                  borderRadius: "10px",
                }}
              >
                <h4 style={{ margin: 0 }}>
                  {item.title || item.name}
                </h4>

                {item.subtitle && (
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
