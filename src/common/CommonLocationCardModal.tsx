/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
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
  console.log("🚀 ~ CommonLocationCardModal ~ location:", location)
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [loadingFav] = useState(false);

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

  

  return (
    <div className="w-full">
      <Dialog
        key={location.id}
        open={openDialog === location.id}
        onOpenChange={(open) => setOpenDialog(open ? location.id : null)}
      >
        <DialogTrigger asChild>
          <Card className="lg:w-full relative border-none h-[380px] xl:h-[350px] card mx-0 p-0 rounded-[30px] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(47,171,249,0.90)] bg-transparent cursor-pointer">
          <CardContent className="flex flex-col overflow-hidden items-center  p-0">
            <Carousel className="w-full ">
            <CarouselContent className="p-0 ">
              {location.imgUrls.length > 0 ? (
                location.imgUrls.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-4 ">
                      <div className="flex items-center border-none justify-center ">
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
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          No images
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious
              type="button"
              className="
                absolute top-1/2 left-2 -translate-y-1/2 z-10
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
                absolute top-1/2 right-2 -translate-y-1/2 z-10
                h-10 w-10 rounded-full
                bg-white/15 text-black font-bold cursor-pointer border border-white/20
                backdrop-blur shadow-lg
                hover:bg-white/25 hover:scale-105 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              "
            >
              <ChevronRight className="h-10 w-10" />
            </CarouselNext>
          </Carousel>


              <h3 className="text-white text-xl lg:font-semibold px-4">
                {location.location}
              </h3>
              <p className="text-white/80 text-base lg:text-[14px] px-4">
                {location.description || "-"}
              </p>

             

              {select && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect && onToggleSelect(location.id);
                  }}
                  tabIndex={-1}
                  className="w-9 h-9 bg-[#081028] border-4 border-dashboard-border absolute lg:-right-4 shadow-lg -top-4 flex items-center justify-center rounded-full"
                >
                  <motion.button
                    className="bg-transparent"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    type="button"
                  >
                    <Circle
                      className={`h-8 w-8 cursor-pointer ${
                        isSelected ? "fill-dashboard-border stroke-[#081028]" : "stroke-[#081028] stroke-2"
                      }`}
                    />
                  </motion.button>
                </div>
              )}
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto border-none overflow-y-auto max-h-[80vh]">
          <DialogHeader className="text-white font-semibold text-2xl">
            Screen Details
          </DialogHeader>

          <div className="flex flex-col lg:flex-row justify-between mt-6 w-full">
            <div className="lg:w-2/4 space-y-4 lg:space-y-6">
              <h3 className="text-white text-base lg:text-lg lg:font-semibold">
                {location.title}
              </h3>
              <p className="text-base text-title-color mt-2">
                Location: {location.location || "-"}
              </p>
              <p className="text-base lg:text-lg lg:font-semibold">
                Screen Size: {location.screenSize || "-"}
              </p>
              <p className="text-base lg:text-lg lg:font-semibold">
                Resolution: {location.resolution || "-"}
              </p>
              <p className="text-base lg:text-lg lg:font-semibold">
                Price: ${location.price || 0}
              </p>
              <p className="text-base lg:text-lg lg:font-semibold">
                Availability: {capitalize(location.availability)}
              </p>

              <p className="text-[#c3cee9] text-base lg:text-lg lg:font-semibold mt-2">
                Screen Status:{" "}
                <span className="text-white font-semibold">
                  {capitalize(location.status)}
                </span>
              </p>

              <div
                className="inline-block px-4 py-2 rounded-lg mt-2"
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

            <div className="lg:w-2/4 mt-10 lg:mt-0 space-y-4">
              {location?.imageUrls?.length ? (
                location?.imageUrls?.map((img) => (
                  <img
                    key={img.index || img.url}
                    src={img.url}
                    alt={location.title}
                    className="w-full h-[250px] object-cover rounded-lg"
                  />
                ))
              ) : (
                <img
                  src="/placeholder.jpg"
                  alt="No Image"
                  className="w-full h-[250px] object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          <p className="lg:text-lg mt-4 text-[#c3cee9]">
            <span className="font-semibold text-white">Description:</span>{" "}
            {location.description || "-"}
          </p>

          {showButton && (
            <Link to="/user-dashboard/new-campaign">
              <div className="mt-6 flex justify-start">
                <CommonDashboardButton title="Add campaign" />
              </div>
            </Link>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonLocationCardModal;
