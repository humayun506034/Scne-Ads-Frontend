import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { useGetAllBannersQuery } from "@/store/api/bannerApi";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../../../../assets/logo.png";

const DashboardBanner = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const { data, isLoading, isError } = useGetAllBannersQuery({ limit: 1000 });

  // API response structure: { success, message, data: [...] }
  const bannerList = data?.data|| [];

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
        className="mySwiper w-full h-[250px] mx-0 p-0"
      >
        {/* Show loading placeholder or fallback if needed */}
        {isLoading && (
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              Loading banners...
            </div>
          </SwiperSlide>
        )}

        {isError && (
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-500">
              Failed to load banners
            </div>
          </SwiperSlide>
        )}

        {!isLoading &&
          !isError &&
          bannerList.map((banner, index) => (
            <SwiperSlide key={banner.id} className="p-0 m-0">
              <div className="relative w-full h-full">
                <img
                  src={banner.img_url}
                  alt={`Banner ${index + 1}`}
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
