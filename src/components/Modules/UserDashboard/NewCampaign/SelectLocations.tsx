import CommonLocationCardModal from "@/common/CommonLocationCardModal";
import { useGetAllLocationsQuery } from "@/store/api/locations/ScreenApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setScreens } from "@/store/Slices/campaign/campaignSlice";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SelectLocations() {
  const dispatch = useAppDispatch();
  const selectedScreens = useAppSelector((state) => state.campaign.screenIds);

  const { data, isLoading, isError } = useGetAllLocationsQuery();
  
  const locations = data?.data?.data; 
  
  function toggleSelect(id: string) {
    let updatedScreens: string[];
    if (selectedScreens.includes(id)) {
      updatedScreens = selectedScreens.filter((screenId) => screenId !== id);
    } else {
      updatedScreens = [...selectedScreens, id];
    }
    dispatch(setScreens(updatedScreens));
  }


  if (isLoading) {
    return (
      <div className="w-full my-20 grid place-items-center">
        <h1 className="text-white text-2xl">
          📡 Loading available screens...
        </h1>
       
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full my-20 grid place-items-center text-center p-8 bg-red-800/20 border border-red-700 rounded-lg">
        <h1 className="text-red-400 text-2xl font-bold">
          🚨 Failed to Fetch Locations
        </h1>
        <p className="text-gray-300 mt-2">
          There was an error retrieving the screen data. Please check your network connection or try again later.
        </p>
      </div>
    );
  }
  
  if (!locations || locations.length === 0) {
    return (
      <div className="w-full my-20 grid place-items-center p-8 bg-blue-800/20 border border-blue-700 rounded-lg">
        <h1 className="text-blue-400 text-2xl">
          ℹ️ No screens available at this time.
        </h1>
      </div>
    );
  }
  




  return (
    <div className="w-full my-20">
      {/* Category Select */}
      <div className="grid place-items-center">
        <h1 className="w-fit cursor-pointer text-white font-medium text-2xl md:text-4xl border-none rounded-xl px-4 py-3 flex justify-center items-center">
          New Arrival
        </h1>
      </div>

      {/* Locations Swiper */}
      <div className="relative mt-8">
        <Swiper
          grabCursor={true}
          slidesPerView={1}
          initialSlide={0}
          spaceBetween={20}
          modules={[Scrollbar]}
          scrollbar={{
            hide: false,
            draggable: true,
            snapOnRelease: true,
          }}
          breakpoints={{
            1440: { slidesPerView: 4 },
            1280: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          className="mySwiper w-full mx-auto"
        >
          {locations?.map((location) => (
            <SwiperSlide className="px-2 pt-6 pb-20" key={location.id}>
              <CommonLocationCardModal
                showButton={false}
                location={location}
                fav={new Set(selectedScreens)}
                onToggleFav={toggleSelect}
                select={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}