import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toggleScreen } from "@/store/Slices/campaign/campaignSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Screen } from "@/types/locations";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FilterSidebarProps {
  screens: Screen[];
  selectedScreenId: string | null;
  onScreenSelect: (screenId: string) => void;
}

export function FilterSidebar({
  screens,
  selectedScreenId,
  onScreenSelect,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.campaign.screenIds);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "booked":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "maintenance":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-title-color border-gray-500/30";
    }
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full bg-bg-dashboard border-[#3A5A8E] text-white"
        >
          <Filter className="w-4 h-4 mr-2" /> Select Boards
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-full max-w-sm bg-dashboard-card-bg rounded-lg p-4 md:p-6 h-[calc(100vh-8rem)]">
        <div className="overflow-y-auto flex-1">
          <FilterContent
            screens={screens}
            selectedScreenId={selectedScreenId}
            onScreenSelect={onScreenSelect}
            getStatusBadgeColor={getStatusBadgeColor}
            selectedIds={selectedIds}
            onToggleSelect={(id) => dispatch(toggleScreen(id))}
          />
        </div>
        <div className="pt-4 border-t border-slate-700 mt-4">
          <div className="flex items-center justify-between mb-2 text-sm text-white">
            <span>Selected</span>
            <span className="font-semibold">{selectedIds.length}</span>
          </div>
          <Button
            className="w-full bg-[#14CA74] cursor-pointer hover:bg-[#10a862] text-[#081028] font-semibold"
            disabled={selectedIds.length === 0}
            onClick={() => navigate("/user-dashboard/new-campaign")}
          >
            Build Campaign
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70">
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#16294E] p-6 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Select Boards</h2>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-[#3A5A8E]"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterContent
                screens={screens}
                selectedScreenId={selectedScreenId}
                onScreenSelect={(id) => {
                  onScreenSelect(id);
                  setIsOpen(false);
                }}
                getStatusBadgeColor={getStatusBadgeColor}
                selectedIds={selectedIds}
                onToggleSelect={(id) => dispatch(toggleScreen(id))}
              />
            </div>
            <div className="pt-4 border-t border-slate-700 mt-4">
              <div className="flex items-center justify-between mb-2 text-sm text-white">
                <span>Selected</span>
                <span className="font-semibold">{selectedIds.length}</span>
              </div>
              <Button
                className="w-full bg-[#14CA74] cursor-pointer  hover:bg-[#10a862] text-[#081028] font-semibold"
                disabled={selectedIds.length === 0}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/user-dashboard/new-campaign");
                }}
              >
                Build Campaign
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterContent({
  screens,
  selectedScreenId,
  onScreenSelect,
  getStatusBadgeColor,
  selectedIds,
  onToggleSelect,
}: {
  screens: Screen[];
  selectedScreenId: string | null;
  onScreenSelect: (screenId: string) => void;
  getStatusBadgeColor: (status: string) => string;
  selectedIds: string[];
  onToggleSelect: (screenId: string) => void;
}) {
  return (
    <div className="space-y-4">
    
      <div className="text-gray-300 text-sm mb-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white">
          See the available boards
        </h2>
        <p className="text-xs text-title-color 
">
          Select from available billboard locations to create your campaign
        </p>
      </div>

      {/* Screens List */}
      <div className="space-y-4 pr-2">
        {screens.map((screen) => {
          const isSelected = screen.id === selectedScreenId;
          const isChecked = selectedIds.includes(screen.id);
          return (
            <div
              key={screen.id}
              onClick={() => screen.id && onScreenSelect(screen.id)}
              className={`p-4 border  rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-[#14CA74] bg-[#14CA74]/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800/70"
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Screen Name */}
                <h3 className="text-xl font-medium text-white mb-2">
                  {screen.screen_name}
                </h3>
                <button
                  type="button"
                  aria-label={isChecked ? "Deselect board" : "Select board"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect(screen.id);
                  }}
                  className={`h-7 w-7 rounded-full cursor-pointer border flex items-center justify-center mt-1 ${
                    isChecked
                      ? "bg-[#14CA74] border-[#14CA74]"
                      : "bg-transparent border-slate-500"
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${isChecked ? "bg-[#081028]" : "bg-transparent"}`}></span>
                </button>
              </div>

              {/* Images Carousel */}
              <div className="mb-3">
                <Carousel className="w-full relative">
                  <CarouselContent className="p-0">
                    {screen.imageUrls && screen.imageUrls.length > 0 ? (
                      screen.imageUrls.map((imgUrl, index: number) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <img
                              src={imgUrl.url}
                              alt={`Screen ${screen.screen_name} image ${index + 1}`}
                              className="w-full h-40 object-cover rounded-lg"
                              aria-label={`Screen ${screen.screen_name} image ${index + 1}`}
                            />
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      <CarouselItem>
                        <div className="p-1 flex items-center justify-center h-32 bg-slate-800 rounded-lg">
                          <span className="text-sm font-medium text-slate-400">
                            No images
                          </span>
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>

                  {screen.imageUrls && screen.imageUrls.length > 1 && (
                    <>
                      <CarouselPrevious
                        className="absolute top-1/2 left-2 -translate-y-1/2 z-10
                          h-6 w-6 rounded-full
                          bg-white/15 text-white cursor-pointer border border-white/20
                          backdrop-blur shadow-lg
                          hover:bg-white/25 hover:scale-105 transition"
                      />
                      <CarouselNext
                        className="absolute top-1/2 right-2 -translate-y-1/2 z-10
                          h-6 w-6 rounded-full
                          bg-white/15 text-white cursor-pointer border border-white/20
                          backdrop-blur shadow-lg
                          hover:bg-white/25 hover:scale-105 transition"
                      />
                    </>
                  )}
                </Carousel>
              </div>

              {/* Screen Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className={`${getStatusBadgeColor(
                      screen.availability || "available"
                    )} border`}
                  >
                    {screen.availability || "available"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-title-color">Size:</span>
                    <span className="ml-1 font-medium text-white">
                      {screen.screen_size || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-title-color">Price:</span>
                    <span className="ml-1 font-medium text-white">
                      ${screen.price || 0}/day
                    </span>
                  </div>
                  <div>
                    <span className="text-title-color">Location:</span>
                    <span className="ml-1 font-medium text-white">
                      {screen.location || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-title-color">Resolution:</span>
                    <span className="ml-1 font-medium text-white">
                      {screen.resolution || "N/A"}
                    </span>
                  </div>
                </div>

                {screen.description && (
                  <p className="text-xs text-title-color mt-2 line-clamp-2">
                    {screen.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
