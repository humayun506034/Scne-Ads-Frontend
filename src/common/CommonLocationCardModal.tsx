/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  Circle,
  Info,
  MapPin,
  Monitor,
  Tv2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface ILocation {
  id: string;
  category?: "new" | "fav" | "top";
  imageUrls: { url: string; index?: string }[];
  title: string;
  screenSize?: string;
  description?: string;
  resolution?: string;
  price?: number;
  availability?: "available" | "booked" | "maintenance";
  lat?: number;
  lng?: number;
  location?: string;
  status?: "active" | "inactive" | "maintenance";
}

export interface LocationCardProps {
  location: ILocation;
  select?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  showButton?: boolean;
}

const CommonLocationCardModal = ({
  location,
  select,
  isSelected,
  onToggleSelect,
  showButton = false,
}: any) => {

  
 

  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const getBadgeColors = (category?: "new" | "fav" | "top") => {
    switch (category) {
      case "new":
        return { textColor: "#A2F3CD", bgColor: "#18432F" };
      case "fav":
        return { textColor: "#FFB3B3", bgColor: "#8B0000" };
      case "top":
        return { textColor: "#F1E05A", bgColor: "#FF8000" };
      default:
        return { textColor: "#FFFFFF", bgColor: "#000000" };
    }
  };

  const capitalize = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "-";

  const images =
    location?.imgUrls?.map((image, index) => ({
      url: image.url,
      index: index,
    })) ||
    location?.imageUrls?.map((image, index) => ({
      url: image.url,
      index: index,
    }));

  return (
    <div className="w-full">
      <Dialog
        key={location.id}
        open={openDialog === location.id}
        onOpenChange={(open) => setOpenDialog(open ? location.id : null)}
      >
        <DialogTrigger asChild>
          <Card className="lg:w-full relative border-none h-[380px] xl:h-[360px] card mx-0 p-0 rounded-[30px] text-center transition-all duration-300 hover:shadow-[0px_0px_25px_0px_rgba(47,171,249,0.65)] bg-transparent cursor-pointer">
            <CardContent className="flex flex-col overflow-hidden md:items-center p-0">
              <Carousel className="w-full ">
                <CarouselContent className="p-0 ">
                  {images.length > 0 ? (
                    images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-4 bg-transparent">
                          <div className="flex md:items-center border-none justify-center ">
                            <img
                              src={image.url}
                              alt={`image ${index + 1}`}
                              className="object-fill rounded-[15px] w-full h-[220px]"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem className="absolute  top-1/2 left-0">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square md:items-center justify-center p-6">
                            <span className="text-4xl font-semibold">
                              No images
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>

                {/* <CarouselPrevious
              type="button"
              className="
                absolute top-1/2 cursor-pointer left-2 -translate-y-1/2 z-10
                h-10 w-10 rounded-full
                bg-white/15 text-black font-bold cursor-pointer border border-white/20
                backdrop-blur shadow-lg
                hover:bg-white/25 hover:scale-105 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              "
            >
              <ChevronLeft className="h-10 w-10" />
            </CarouselPrevious>
            <CarouselNext
              type="button"
              className="
                absolute top-1/2 cursor-pointer right-2 -translate-y-1/2 z-10
                h-10 w-10 rounded-full
                bg-white/15 text-black font-bold cursor-pointer border border-white/20
                backdrop-blur shadow-lg
                hover:bg-white/25 hover:scale-105 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              "
            >
              <ChevronRight className="h-10 w-10" />
            </CarouselNext> */}
              </Carousel>

              <div>
                <div className="   px-6">
                  <div className="flex justify-center md:items-center gap-2">
                    <MapPin className="h-4 w-4 text-white/90" />
                    <h3 className="text-white text-center text-base lg:text-xl font-semibold truncate">
                      {location.location}
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm  mt-2 line-clamp-2">
                    {location.description }
                  </p>
                </div>
              </div>

              {select && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect && onToggleSelect(location.id);
                  }}
                  tabIndex={-1}
                  className="w-9 h-9 bg-[#081028] border-4 border-dashboard-border absolute lg:-right-4 shadow-lg -top-4 flex md:items-center justify-center rounded-full"
                >
                  <motion.button
                    className="bg-transparent "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    type="button"
                  >
                    <Circle
                      className={`h-8 w-8 cursor-pointer ${
                        isSelected
                          ? "fill-dashboard-border stroke-[#081028]"
                          : "stroke-[#081028] stroke-2"
                      }`}
                    />
                  </motion.button>
                </div>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent
          className="rounded-2xl lg:p-6  mx-auto !w-fit !max-w-[700px] overflow-y-auto max-h-[80vh] h-full
  bg-gradient-to-br from-[#0c142b] via-[#101a37] to-[#0b1325] border border-white/10 
  text-white shadow-[0_0_50px_rgba(56,189,248,0.35)]"
        >
          <DialogTitle className="flex justify-center items-center gap-2 text-2xl font-semibold mb-4">
            <Info className="text-sky-400 h-6 w-6" />
            Screen Details
          </DialogTitle>

          {/* Carousel stays same */}
          <div className="mb-4">
            <Carousel className="w-full">
              <CarouselContent className="p-0">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-3">
                        <div className="flex justify-center">
                          <img
                            src={image.url}
                            alt={`image ${index + 1}`}
                            className="object-cover rounded-xl w-full h-64 
                      shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:scale-[1.02] transition-transform"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <div className="flex justify-center items-center h-64 text-gray-400">
                      No images available
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>

              <CarouselPrevious
                type="button"
                className="absolute top-1/2 left-2 -translate-y-1/2 z-10
          h-10 w-10 rounded-full bg-white/10 text-white border border-white/20
          backdrop-blur-md shadow-lg cursor-pointer hover:bg-white/20 hover:scale-105 transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </CarouselPrevious>

              <CarouselNext
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 z-10
          h-10 w-10 rounded-full bg-white/10 text-white border border-white/20
          backdrop-blur-md shadow-lg cursor-pointer hover:bg-white/20 hover:scale-105 transition"
              >
                <ChevronRight className="h-6 w-6" />
              </CarouselNext>
            </Carousel>
          </div>

          {/* Details Table */}
          <div className="w-full text-title-color text-sm md:text-base mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-2 md:gap-x-6">
              {/* Row 1 */}
              <div className="flex items-center gap-2">
                <Monitor className="text-sky-400 h-4 w-4" />
                <span>{location.title || location.screen_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-emerald-400 h-4 w-4" />
                <span>Location:</span> {location.location || "-"}
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-2">
                <Tv2 className="text-blue-400 h-4 w-4" />
                <span>Screen Size:</span> {location.screenSize || location.size}
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="text-indigo-400 h-4 w-4" />
                <span>Resolution:</span> {location.resolution || "-"}
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="text-yellow-400 h-4 w-4" />
                <span>Price (Per Day):</span> ${location.price || 0}
              </div>
              <div className="flex items-center gap-2">
                <Info className="text-sky-400 h-4 w-4" />
                <span>Availability:</span> {capitalize(location.availability)}
              </div>

              {/* Row 4 */}
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sky-400">
                  Status: {capitalize(location.status)}
                </p>
              </div>
              <div className="flex md:justify-start">
                <div
                  className="inline-block px-4 py-1 rounded-lg"
                  style={{
                    backgroundColor: getBadgeColors(location.category).bgColor,
                    color: getBadgeColors(location.category).textColor,
                  }}
                >
                  {location.category === "new" && "New Arrival"}
                  {location.category === "fav" && "Favorites"}
                  {location.category === "top" && "Top Selling"}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-title-color leading-relaxed">
            <span className="text-sky-400 font-semibold">Description:</span>{" "}
            {location.description || "-"}
          </p>

          {showButton && (
            <Link to="/user-dashboard/new-campaign">
              <div className="mt-6 flex justify-center md:justify-end">
                <CommonDashboardButton title="Add Campaign" />
              </div>
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonLocationCardModal;
