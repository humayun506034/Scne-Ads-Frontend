import CommonLocationCardModal from "@/common/CommonLocationCardModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locationData } from "@/lib/Data";
import { useState } from "react";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


export default function SelectLocations() {
  const [selectedCategory, setSelectedCategory] = useState("new");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  console.log("🚀 ~ SelectLocations ~ selected:", selected);

  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.has(id)
        ? new Set([...prev].filter((selectedId) => selectedId !== id))
        : new Set(prev).add(id)
    );
  }

  // Filter locations based on selected category
  const filteredLocations = locationData.filter(
    (location) => location.category === selectedCategory
  );
  const TabName = [
    { tab: "new", label: "NEW ARRIVALS" },
    { tab: "top", label: "TOP SELLERS" },
    { tab: "fav", label: "FAVOURITES" },
  ];
  return (
    <div className="w-full my-20">
      <div
        className="grid  place-items-center
    "
      >
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-fit cursor-pointer text-white font-medium text-2xl md:text-4xl border-none rounded-xl px-4 py-3 flex justify-center items-center">
            <SelectValue
              placeholder={
                selectedCategory === "new"
                  ? "New Arrival"
                  : selectedCategory === "fav"
                  ? "Favorites"
                  : selectedCategory === "top"
                  ? "Top Selling"
                  : "Select Category"
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-[#0B1739] text-white rounded-lg p-2 border-none">
            {TabName.map((item) => (
              <SelectItem
                key={item.tab}
                value={item.tab}
                className={`cursor-pointer py-2 px-4 hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] hover:text-white ${
                  selectedCategory === item.tab
                    ? "font-semibold text-[#38B6FF]"
                    : "font-normal"
                }`}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
            1440: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1,
            },
          }}
          className="mySwiper w-full  mx-auto"
        >
          {filteredLocations.map((location) => (
            <SwiperSlide className="px-2 pt-6 pb-20 " key={location.id}>
              <CommonLocationCardModal
              showButton={false}
                location={location}
                fav={selected}
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
