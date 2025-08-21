import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Circle, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export interface ILocation {
  id: string;
  image: string;
  title: string;
  category: "new" | "fav" | "top";
  screenSize: string;
  description: string;
  location?: string;
  tierLevel?: "Basic" | "Standard" | "Premium";
  costPerPlay?: number;
}

export interface LocationCardProps {
  location: ILocation;
  fav?: Set<string>;
  bookmark?: boolean;
  select?: boolean;
  onToggleFav?: (id: string) => void;
}

const LocationCard = ({
  location,
  fav,

  bookmark,
  select,
  onToggleFav,
}: LocationCardProps) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (fav?.has(id)) {
      if (onToggleFav) onToggleFav(id);
      toast.error("Item removed from favorites!");
    } else {
      if (onToggleFav) onToggleFav(id);
      toast.success("Location bookmarked successfully!");
    }
  };

  const getBadgeColors = ({
    category,
  }: {
    category: "new" | "fav" | "top";
  }) => {
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

  return (
    <div className="w-full">
      <Dialog
        key={location.id}
        open={openDialog === location.id}
        onOpenChange={(open) => setOpenDialog(open ? location.id : null)}
      >
        <DialogTrigger asChild>
          <Card className="lg:w-full relative border-none h-[380px] xl:h-[350px] card  mx-0 p-0 rounded-[30px] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(47,171,249,0.90)] bg-transparent cursor-pointer">
            <CardContent className="flex flex-col items-center gap-4 text-center p-0">
              <div className="w-full rounded-[15px] overflow-hidden p-6">
                <img
                  src={location.image}
                  alt={location.title}
                  className="object-cover rounded-xl w-full h-40"
                />
              </div>
              <h3 className="text-white text-xl lg:font-semibold px-4">
                {location.title}
              </h3>
              <p className="text-white/80 text-base lg:text-[14px] px-4">
                {location.description}
              </p>
              {bookmark ||
                (fav && (
                  <div
                    onClick={(e) => handleBookmark(e, location.id)}
                    tabIndex={-1}
                    className="w-12 h-12 bg-[#033579] absolute -right-5 shadow-lg -bottom-5 flex items-center justify-center rounded-full"
                  >
                    <motion.button
                      className="bg-transparent"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      type="button"
                    >
                      <Heart
                        className={`h-7 w-7 cursor-pointer ${
                          fav?.has(location.id)
                            ? "fill-white stroke-white"
                            : "stroke-white"
                        }`}
                      />
                    </motion.button>
                  </div>
                ))}
              {select && (
                <div
                  onClick={(e) => handleBookmark(e, location.id)}
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
                        fav?.has(location.id)
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

        <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto max-h-[80vh]">
          <DialogHeader className="text-white font-semibold text-2xl">
            Screen Details
          </DialogHeader>
          <div className="flex flex-col lg:flex-row justify-between mt-6 w-full">
            <div className="lg:w-2/4 space-y-4 lg:space-y-6">
              <h3 className="text-white text-base lg:text-lg lg:font-semibold">
                {location.title}
              </h3>
              <p className="text-base text-title-color mt-2">Location name</p>
              <p className="text-base lg:text-lg lg:font-semibold">
                {location.screenSize}
              </p>
              <p className="mt-2 text-base text-title-color">Screen Size</p>

              <div>
                <p className="text-[#c3cee9] text-base lg:text-lg lg:font-semibold mb-2">
                  Status
                </p>
                <div
                  className="inline-block px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: getBadgeColors({
                      category: location.category,
                    }).bgColor,
                    color: getBadgeColors({ category: location.category })
                      .textColor,
                  }}
                >
                  {location.category === "new" && "New Arrival"}
                  {location.category === "fav" && "Favorites"}
                  {location.category === "top" && "Top Selling"}
                </div>
              </div>
            </div>
            <div className="lg:w-2/4 mt-10 lg:mt-0 rounded-lg">
              <img
                src={location.image}
                alt="Location"
                className="w-full h-[250px] object-fill rounded-lg"
              />
            </div>
          </div>
          <p className="lg:text-lg mt-4 text-[#c3cee9]">
            <span className="font-semibold text-white"> Description :</span>{" "}
            {location.description}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default LocationCard;
