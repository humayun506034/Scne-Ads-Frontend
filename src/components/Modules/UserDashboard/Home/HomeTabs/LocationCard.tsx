import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";
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
}

interface LocationCardProps {
  locations: ILocation[];
  fav: Set<string>;
  onToggleFav: (id: string) => void;
}

export function LocationCard({
  locations,
  fav,
  onToggleFav,
}: LocationCardProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (fav.has(id)) {
      onToggleFav(id);
      toast.error("Item removed from favorites!");
    } else {
      onToggleFav(id);
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
        return {
          textColor: "#A2F3CD",
          bgColor: "#18432F",
        };
      case "fav":
        return {
          textColor: "#FFB3B3",
          bgColor: "#8B0000",
        };
      case "top":
        return {
          textColor: "#F1E05A",
          bgColor: "#FF8000",
        };
      default:
        return {
          textColor: "#FFFFFF",
          bgColor: "#000000",
        };
    }
  };

  return (
    <div className="w-full">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {locations.map((location) => (
          <Dialog
            key={location.id}
            open={openDialog === location.id}
            onOpenChange={(open) => setOpenDialog(open ? location.id : null)}
          >
            <DialogTrigger asChild>
              <Card className="md:w-full relative border-none h-[380px] card md:h-[350px] mx-0 p-0 rounded-[30px] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(47,171,249,0.90)] bg-transparent cursor-pointer">
                <CardContent className="flex flex-col items-center gap-4  text-center  p-0">
                  <div className="w-full rounded-[15px] overflow-hidden p-6">
                    <img
                      src={location.image}
                      alt={location.title}
                      className="object-cover rounded-xl w-full h-40"
                    />
                  </div>
                  <h3 className="text-white text-base md:text-xl md:font-semibold px-4">
                    {location.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-[14px] px-4">
                    {location.description}
                  </p>

                  <div
                    onClick={(e) => handleBookmark(e, location.id)}
                    tabIndex={-1}
                    className="w-12 h-12 bg-[#033579]  absolute -right-5 shadow-lg   -bottom-5 flex items-center justify-center rounded-full"
                  >
                    <motion.button
                      className=" bg-transparent"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      type="button"
                    >
                      <Heart
                        className={`h-7  w-7 cursor-pointer ${
                          fav.has(location.id)
                            ? "fill-white stroke-white"
                            : "stroke-white"
                        }`}
                      />
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-[#081028] rounded-lg p-10 lg:min-w-5xl  mx-auto border-none">
              <DialogHeader className="text-white font-semibold text-2xl">
                Screen Details
              </DialogHeader>
              <div className="flex flex-col lg:flex-row  justify-between mt-6 w-full ">
                <div className="w-2/4 space-y-6">
                  <h3 className="text-white text-lg font-semibold">
                    {location.title}
                    <p className="text-base text-title-color mt-2">
                      Location name
                    </p>
                  </h3>
                  <p className=" text-lg font-semibold ">
                    {location.screenSize}{" "}
                    <p className="mt-2 text-base text-title-color">
                      Screen Size
                    </p>{" "}
                  </p>

                  <div>
                    <p className="text-[#c3cee9] text-lg font-semibold  mb-2">
                      Status
                    </p>
                    <div
                      className="inline-block px-4 py-2 rounded-lg  "
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
                <div className="w-2/4   rounded-lg">
                  <img
                    src={location.image}
                    alt="Location"
                    className="w-full h-[250px] object-fill rounded-lg "
                  />
                </div>
              </div>
              <p className="text-lg text-[#c3cee9]">
                <span className="font-semibold text-white"> Description :</span>{" "}
                Dominate a key European intersection with iconic digital
                billboards.
              </p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
