import { cardData } from "@/components/Modules/UserDashboard/Home/SpecialSection/SpecialSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SpecialCard from "./AdminSpecialCard";

const AdminSpecialSection = () => {
  return (
    <div className="mt-20 relative">
      <h1 className="text-3xl font-semibold text-center">Special </h1>
      <Carousel className="w-full mt-0">
        <CarouselContent>
          {cardData.map((card, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4 "
            >
              <SpecialCard {...card} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10">
          <CarouselPrevious className="bg-white shadow-lg border-none w-8 h-8 flex items-center text-black justify-center cursor-pointer" />
        </div>
        <div className="absolute top-1/2 right-16 -translate-y-1/2 z-10">
          <CarouselNext className="bg-white shadow-lg border-none text-black w-8 h-8 flex items-center justify-center cursor-pointer" />
        </div>
      </Carousel>
    </div>
  );
};

export default AdminSpecialSection;
