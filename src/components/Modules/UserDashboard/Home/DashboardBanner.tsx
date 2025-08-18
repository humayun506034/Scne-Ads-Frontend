import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../../../assets/Dashboard/board1.jpg";
import img2 from "../../../../assets/Dashboard/board2.jpg";
import img3 from "../../../../assets/Dashboard/board3.jpg";
import img4 from "../../../../assets/Dashboard/board4.jpg";
import img5 from "../../../../assets/Dashboard/board5.jpg";
import logo from "../../../../assets/logo.png";

const slidesData = [
  { img: img1, alt: "Billboard 1" },
  { img: img2, alt: "Billboard 2" },
  { img: img3, alt: "Billboard 3" },
  { img: img4, alt: "Billboard 4" },
  { img: img5, alt: "Billboard 5" },
];

const DashboardBanner = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className="mt-20 w-full">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        initialSlide={1}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        coverflowEffect={{
          rotate: 50,
          stretch: 50,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        breakpoints={{
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
        className="mySwiper w-full  h-[250px] mx-0 p-0"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="p-0 m-0">
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.alt}
                className="object-cover w-full h-full"
              />

              {activeSlide === index && (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-black/80 flex flex-col justify-center items-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-24 h-24 mb-4 object-contain"
                  />
                  <Link to="/user-dashboard/new-campaign">
                    <CommonDashboardButton title="New Campaign" Icon={Plus} />
                  </Link>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DashboardBanner;
