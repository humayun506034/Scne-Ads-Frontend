import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import LocationCard from "@/components/Modules/UserDashboard/Home/HomeTabs/LocationCard";
import { locationData } from "@/lib/Data";

export default function AdminLocationTabs() {
  const [fav, setFav] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState("new");

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
    { tab: "fav", label: "FAVOURITES" },
  ];
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
          {locationData
            .filter((location) => location.category === tab)
            .map((location) => (
              <LocationCard
                location={location}
                bookmark={true}
                fav={fav}
                onToggleFav={toggleFav}
              />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
