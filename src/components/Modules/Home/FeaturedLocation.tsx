import CommonWrapper from "@/common/CommonWrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { locationData } from "@/lib/Data";

export function FeaturedLocationsCarousel() {
  return (
    <CommonWrapper>
      <div className="xl:px-0">
        <Carousel className="w-full">
          <CarouselContent className="flex  gap-12">
            {locationData.map((location) => (
              <CarouselItem
                key={location.id}
                className={`  ${"xl:basis-1/4 lg:basis-1/3 md:basis-1/2 sm:basis-1/1"}`}
              >
                <div>
                  <Card className=" md:w-[380px] h-[380px] card md:h-[400px] lg:w-[350px] lg:h-[380px]] my-6 mx-4 md:mx-6 p-0 rounded-[30px] border-1 border-[#2FABF9] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(47,171,249,0.90)] cursor-pointer bg-transparent">
                    <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                      <div className="w-full rounded-[15px] overflow-hidden">
                        <img
                          src={location.image}
                          alt={location.title}
                          className=" object-cover rounded-xl"
                        />
                      </div>
                      <h3 className="text-white text-base md:text-xl md:font-semibold">
                        {location.title}
                      </h3>
                      <p className="text-white/80 text-xs md:text-[14px]">
                        {location.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </CommonWrapper>
  );
}
