 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllBundleQuery } from "@/store/api/Bundle/bundleApi";
import { useState } from "react";
import BundleInfoModal, { Bundle } from "./BundleInfoModal";
import SpecialCard from "./SpecialCard";

const SpecialSection = () => {
  const { data, isLoading, isError } = useGetAllBundleQuery({ limit: 1000 });
  console.log(data)
  // Correct array path
  const bundles: Bundle[] = data?.data?.data || [];

  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBundle(null);
  };

  if (isLoading) return <p className="text-center mt-10">Loading bundles...</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-10">Failed to load bundles.</p>;
  if (!bundles.length) return <p className="text-center mt-10">No bundles found</p>;

  return (
    <div className="mt-20 relative">
      <h1 className="text-3xl font-semibold text-center">Customized Bundles</h1>

      <Carousel className="w-full mt-0">
        <CarouselContent>
          {bundles.map((bundle, index) => (
            <CarouselItem
              key={bundle?.id || index}
              className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4"
            >
              <div
                onClick={() => handleOpenModal(bundle)}
                className="cursor-pointer"
              >
               <SpecialCard
                  title={bundle.bundle_name}
                  bundleTitle={bundle.bundle_name}
                  bundleIcon={"🔥"}
                  image={bundle.img_url}
                  description={[`${bundle.duration}`, `${bundle.screens.length} Screens`]}
                  price={bundle.price.toString()} 
                  id=""
                />

              </div>
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

      {/* Bundle Info Modal */}
      <BundleInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        bundle={selectedBundle}
      />
    </div>
  );
};

export default SpecialSection;
