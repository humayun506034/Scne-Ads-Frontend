import CommonLocationCardModal from "@/common/CommonLocationCardModal";
import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleScreen } from "@/store/Slices/campaign/campaignSlice";
import { useMemo } from "react";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SelectLocations() {
  const dispatch = useAppDispatch();
  const selectedScreens = useAppSelector((state) => state.campaign.screenIds);
  const { data, isLoading,isError } = useGetAllScreenQuery({ limit: 100000, page: "1" });


  
  const screens = useMemo(() => {
    if (!data?.data?.data) return [];
    return data.data.data;
  }, [data]);



 

  if (isLoading) {
    return (
      <div className="w-full my-20 grid place-items-center">
        <h1 className="text-white text-2xl">📡 Loading available screens...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full my-20 grid place-items-center text-center p-8 bg-red-800/20 border border-red-700 rounded-lg">
        <h1 className="text-red-400 text-2xl font-bold">🚨 Failed to Fetch Locations</h1>
        <p className="text-gray-300 mt-2">
          There was an error retrieving the screen data. Please check your network connection or try again later.
        </p>
      </div>
    );
  }

  if (screens.length === 0) {
    return (
      <div className="w-full my-20 grid place-items-center p-8 bg-blue-800/20 border border-blue-700 rounded-lg">
        <h1 className="text-blue-400 text-2xl">ℹ️ No screens available at this time.</h1>
      </div>
    );
  }

  return (
    <div className="w-full my-20">
      <div className="grid place-items-center">
        <h1 className="w-fit cursor-pointer text-white font-medium text-2xl md:text-4xl px-4 py-3 flex justify-center items-center">
          All Available Screens
        </h1>
      </div>

      <div className="relative mt-8">
        <Swiper
          grabCursor
          slidesPerView={1}
          spaceBetween={20}
          modules={[Scrollbar]}
          scrollbar={{ hide: false, draggable: true, snapOnRelease: true }}
          breakpoints={{
            1440: { slidesPerView: 4 },
            1280: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          className="mySwiper w-full mx-auto"
        >
          {screens?.map((location) => {
          
            const fixedLocation = {
              ...location,
              imageUrls: (location.imageUrls || []).map((img, idx) => ({
                url: img.url,
                id: typeof img.id === "string" && img.id ? img.id : String(idx),
              })),
            };
            const isSelected = selectedScreens.includes(location.id);
            return (
              <SwiperSlide className="px-2 pt-6 pb-20" key={location.id}>
                <CommonLocationCardModal
                  showButton={false}
                  location={fixedLocation}
                  select={true}
                  isSelected={isSelected}
                  onToggleSelect={() => dispatch(toggleScreen(location.id))}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
