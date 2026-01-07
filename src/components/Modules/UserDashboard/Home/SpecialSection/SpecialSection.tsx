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

  // Display either real bundles or placeholders while loading
  const displayBundles: Bundle[] = isLoading
    ? Array.from({ length: 4 })
    : bundles;

  return (
    <div className="mt-20 relative">
      <h1 className="text-3xl font-semibold text-center">Customized Bundles</h1>

      {isError && (
        <p className="text-center text-red-500 mt-10">
          Failed to load bundles.
        </p>
      )}
      {!isError && !bundles.length && !isLoading && (
        <p className="text-center mt-10">No bundles found</p>
      )}

      <Carousel className="w-full mt-10">
        <CarouselContent>
          {displayBundles.map((bundle, index) => (
            <CarouselItem
              key={bundle?.id || index}
              className="md:basis-1/2 md:m-4 lg:basis-1/2 xl:basis-1/4"
            >
              <div
                onClick={() => bundle && handleOpenModal(bundle)}
                className="cursor-pointer"
              >
                {isLoading ? (
                  // Skeleton placeholder for loading
                  <div className="animate-pulse h-[300px] rounded-lg bg-gray-200 p-4" />
                ) : (
                  <SpecialCard
                    title={bundle.bundle_name}
                    bundleTitle={bundle.bundle_name}
                    bundleIcon={"🔥"}
                    image={bundle.img_url}
                    description={[
                      `${bundle.duration}`,
                      `${bundle.screens.length} Screens`,
                    ]}
                    price={bundle.price.toString()}
                    id=""
                  />
                )}
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
