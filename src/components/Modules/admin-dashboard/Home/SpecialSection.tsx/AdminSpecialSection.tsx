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

              className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4  "
            >
              {index === 0 && (
                <div className="w-80 h-full  bg-white rounded-lg shadow-lg flex items-center justify-center mb-8">
                  <div className="bg-secondary-color w-20 h-20 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                    >
                      <path
                        d="M18.4665 26.4165H0V18.4665H18.4665V0H26.4165V18.4665H44.883V26.4165H26.4165V44.883H18.4665V26.4165Z"
                        fill="#033579"
                      />
                    </svg>
                  </div>
                </div>
              )}

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
