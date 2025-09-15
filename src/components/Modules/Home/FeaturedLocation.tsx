import CommonWrapper from "@/common/CommonWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { locationData } from "@/lib/Data";

import CommonLocationCardModal, {
  ILocation,
} from "@/common/CommonLocationCardModal";

export function FeaturedLocationsCarousel() {
  return (
    <CommonWrapper>
      <div className="xl:px-0 relative">
        <Carousel className="w-full">
          <CarouselContent className="flex md:gap-0  gap-12">
            {locationData.map((location: ILocation) => (
              <CarouselItem
                key={location.id}
                className="xl:basis-1/4 lg:basis-1/3 md:basis-1/2 sm:basis-1/1 md:m-6"
              >
                <CommonLocationCardModal
                  location={location}
                  showButton={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div
          className="absolute top-32 -left-10 h-40 w-40 -z-10 blur-[60px] opacity-60 rounded-[10%]"
          style={{
            background: "#38B6FF",
          }}
        />
      </div>
    </CommonWrapper>
  );
}
