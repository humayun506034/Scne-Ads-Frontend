/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddFavouriteScreenMutation } from "@/store/api/Screen/screenApi";
import { Circle, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
  fav?: Set<string>;
  bookmark?: boolean;
  select?: boolean;
  onToggleFav?: (id: string) => void;
  showButton?: boolean;
}

const CommonLocationCardModal = ({
  location,
  fav,
  bookmark,
  select,
  onToggleFav,
  showButton = false,
}: any) => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [loadingFav, setLoadingFav] = useState(false);
  const [addFavouriteScreen] = useAddFavouriteScreenMutation();

  const handleBookmark = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    if (fav?.has(id)) {
      // Remove locally only
      onToggleFav?.(id);
      toast.error("Item removed from favorites!");
      return;
    }

    try {
      setLoadingFav(true);
      // Only send screenId in the POST body
      await addFavouriteScreen({ screenId: id }).unwrap();
      onToggleFav?.(id);
      toast.success("Location bookmarked successfully!");
     
    } catch (err: any) {
      console.error("Add favourite failed:", err);
      toast.error(err?.data?.message || "Failed to add to favorites.");
    } finally {
      setLoadingFav(false);
    }
  };

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

  const firstImage = location?.imgUrls?.[0]?.url || "/placeholder.jpg";

  return (
    <div className="w-full">
      <Dialog
        key={location.id}
        open={openDialog === location.id}
        onOpenChange={(open) => setOpenDialog(open ? location.id : null)}
      >
        <DialogTrigger asChild>
          <Card className="lg:w-full relative border-none h-[380px] xl:h-[350px] card mx-0 p-0 rounded-[30px] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(47,171,249,0.90)] bg-transparent cursor-pointer">
            <CardContent className="flex flex-col items-center gap-4 text-center p-0">
              <div className="w-full rounded-[15px] overflow-hidden p-6">
                <img
                  src={firstImage}
                  alt={location.title}
                  className="object-cover rounded-xl w-full h-40"
                />

              </div>

              <h3 className="text-white text-xl lg:font-semibold px-4">
                {location.location}
              </h3>
              <p className="text-white/80 text-base lg:text-[14px] px-4">
                {location.description || "-"}
              </p>

              {(bookmark || fav) && (
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
                    disabled={loadingFav}
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
              )}

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
                      className={`h-8 w-8 cursor-pointer ${fav?.has(location.id)
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
              {location.imageUrls?.length ? (
                location.imageUrls.map((img) => (
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
