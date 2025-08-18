import { Button } from "@/components/ui/button";
import { Maximize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen?: () => void;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
}: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <Button
        size="icon"
        variant="secondary"
        onClick={onZoomIn}
        className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border border-gray-200"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onClick={onZoomOut}
        className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border border-gray-200"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onClick={onReset}
        className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border border-gray-200"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>

      {onFullscreen && (
        <Button
          size="icon"
          variant="secondary"
          onClick={onFullscreen}
          className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border border-gray-200"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
