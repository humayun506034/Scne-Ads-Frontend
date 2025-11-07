/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonLocationCardModal from "@/common/CommonLocationCardModal";
import Loading from "@/common/MapLoading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetMySelfFavouriteScreensQuery,
  useGetNewArrivalScreensQuery,
  useGetTopSalesScreenQuery,
} from "@/store/api/Screen/screenApi";
import { useEffect, useState } from "react";

export default function LocationTabs() {
  const [fav, setFav] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState("new");
  const [data, setData] = useState<any[]>([]);

  function toggleFav(id: string) {
    setFav((prev) =>
      prev.has(id)
        ? new Set([...prev].filter((favId) => favId !== id))
        : new Set(prev).add(id)
    );
  }

  const TabName = [
    { tab: "new", label: "NEW ARRIVALS" },
    { tab: "top", label: "TOP SELLERS" },
    { tab: "fav", label: "MY FAVOURITES SCREENS" },
  ];

  // Queries
  const {
    data: favData,
    isLoading: favLoading,
    error: favError,
  } = useGetMySelfFavouriteScreensQuery(
    { limit: 100000, page: 1 },
    { skip: tab !== "fav" }
  );

  const { data: topData, isLoading: topLoading, error: topError } =
    useGetTopSalesScreenQuery(undefined, { skip: tab !== "top" });

  const { data: newData, isLoading: newLoading, error: newError } =
    useGetNewArrivalScreensQuery(undefined, { skip: tab !== "new" });

  // Process tab data
  useEffect(() => {
    const processData = () => {
      if (tab === "fav") {
        if (favLoading) return;
        if (favError) {
          console.error("Favourite API Error:", favError);
          setData([]);
          return;
        }

        const screens =
          favData?.data?.map((item: any) => ({
            id: item.id,
            title: item.screen.screen_name,
            description: item.screen.description,
            screenSize: item.screen.screen_size,
            resolution: item.screen.resolution,
            imgUrls: item.screen.imageUrls || [],
            price: item.screen.price,
            lat: Number(item.screen.lat),
            lng: Number(item.screen.lng),
            location: item.screen.location,
            status: item.screen.status,
            availability: item.screen.availability,
            category: "fav",
          })) || [];

        setData(screens);
        return;
      }

      if (tab === "top") {
        if (topLoading) return;
        if (topError) {
          console.error("Top Sales API Error:", topError);
          setData([]);
          return;
        }

        const screens =
          topData?.data?.map((item: any) => ({
            id: item.id,
            title: item.screen_name,
            description: item.description,
            screenSize: item.screen_size,
            resolution: item.resolution,
            imgUrls: item.imageUrls || [],
            price: item.price,
            lat: Number(item.lat),
            lng: Number(item.lng),
            location: item.location,
            status: item.status,
            availability: item.availability,
            category: "top",
          })) || [];

        setData(screens);
        return;
      }

      if (tab === "new") {
        if (newLoading) return;
        if (newError) {
          console.error("New Arrivals API Error:", newError);
          setData([]);
          return;
        }

        const screens =
          newData?.data?.map((item: any) => ({
            id: item.id,
            title: item.screen_name,
            description: item.description,
            screenSize: item.screen_size,
            resolution: item.resolution,
            imgUrls: item.imageUrls || [],
            price: item.price,
            lat: Number(item.lat),
            lng: Number(item.lng),
            location: item.location,
            status: item.status,
            availability: item.availability,
            category: "new",
          })) || [];

        setData(screens);
        return;
      }

      setData([]);
    };

    processData();
  }, [
    tab,
    favData,
    favLoading,
    favError,
    topData,
    topLoading,
    topError,
    newData,
    newLoading,
    newError,
  ]);

  const isLoadingFinal =
    tab === "fav" ? favLoading : tab === "top" ? topLoading : newLoading;

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full mt-20">
          <TabsList className="bg-transparent mb-8 flex ">
         {TabName.map((item) => (
            <TabsTrigger
              key={item.tab}
              value={item.tab}
              className={`relative rounded-none bg-transparent text-white text-sm font-medium px-4 py-2 transition-colors
                data-[state=active]:border-b-2 cursor-pointer data-[state=active]:border-b-blue-500
                border-b-2 border-transparent hover:text-blue-400`}
            >
              {item.label}
        </TabsTrigger>
      ))}
    </TabsList>


      <TabsContent value={tab}>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {isLoadingFinal ? (
            <div className="flex justify-center items-center min-h-[40dvh] "><Loading/></div>
          ) : data.length === 0 ? (
            <p className="text-white">No Data Found</p>
          ) : (
            data.map((location) => (
              <CommonLocationCardModal
                key={location.id}
                showButton={false}
                location={location}
                bookmark={true}
                fav={fav}
                onToggleFav={toggleFav}
              />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
