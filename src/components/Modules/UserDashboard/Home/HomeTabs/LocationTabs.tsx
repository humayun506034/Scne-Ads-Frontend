import CommonLocationCardModal from "@/common/CommonLocationCardModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMySelfFavouriteScreensQuery } from "@/store/api/Screen/screenApi";
import { useEffect, useState } from "react";

// 👇 RTK Query hook import

export default function LocationTabs() {
  const [fav, setFav] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState("new");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const {
    data: favData,
    isLoading: favLoading
  } = useGetMySelfFavouriteScreensQuery(undefined, {
    skip: tab !== "fav", 
  });

  useEffect(() => {
    const fetchData = async () => {
      if (tab === "fav") {
        // RTK Query থেকে আসা data normalize করা
        const screens =
          favData?.data?.map((item: any) => ({
            id: item.screen.id,
            title: item.screen.screen_name,
            description: item.screen.description,
            screenSize: item.screen.screen_size,
            resolution: item.screen.resolution,
            image: item.screen.img_url,
            price: item.screen.price,
            lat: item.screen.lat,
            lng: item.screen.lng,
            location: item.screen.location,
          })) || [];
        setData(screens);
        return;
      }

      setLoading(true);
      try {
        let url = "";
        if (tab === "new") {
          url = "/api/screens/new";
        } else if (tab === "top") {
          url = "/api/screens/top";
        }

        if (url) {
          const res = await fetch(url);
          const result = await res.json();
          setData(result?.data || []);
        }
      } catch (error) {
        console.error("API fetch error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab, favData]);

  console.log({data})

  const isLoadingFinal = tab === "fav" ? favLoading : loading;

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full mt-20">
      <TabsList className="bg-transparent mb-8">
        {TabName.map((item) => (
          <TabsTrigger
            key={item.tab}
            value={item.tab}
            className={`text-white cursor-pointer text-sm font-semibold ${
              tab === item.tab ? "font-semibold" : "font-normal"
            }`}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={tab}>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {isLoadingFinal ? (
            <p className="text-white">Loading...</p>
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
