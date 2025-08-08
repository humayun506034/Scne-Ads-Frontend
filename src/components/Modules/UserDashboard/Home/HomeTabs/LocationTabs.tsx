import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import { locationData } from "@/lib/Data";
import { LocationCard } from "./LocationCard";

export default function LocationTabs() {
  const [fav, setFav] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState("new");

  function toggleFav(id: string) {
    setFav((prev) =>
      prev.has(id)
        ? new Set([...prev].filter((favId) => favId !== id))
        : new Set(prev).add(id)
    );
  }

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full mt-20">
      <TabsList className="bg-transparent mb-8">
        <TabsTrigger
          value="new"
          className={`text-white cursor-pointer text-sm font-semibold ${
            tab === "new" ? "font-semibold" : "font-normal"
          }`}
        >
          NEW ARRIVALS
        </TabsTrigger>
        <TabsTrigger
          value="top"
          className={`text-white cursor-pointer text-sm font-semibold ${
            tab === "top" ? "font-semibold" : "font-normal"
          }`}
        >
          TOP SELLERS
        </TabsTrigger>
        <TabsTrigger
          value="fav"
          className={`text-white cursor-pointer text-sm font-semibold ${
            tab === "fav" ? "font-semibold" : "font-normal"
          }`}
        >
          FAVOURITES
        </TabsTrigger>
      </TabsList>

      <TabsContent value="new">
        <LocationCard
          locations={locationData.filter(
            (location) => location.category === "new"
          )}
          fav={fav}
          onToggleFav={toggleFav}
        />
      </TabsContent>
      <TabsContent value="top">
        <LocationCard
          locations={locationData.filter(
            (location) => location.category === "top"
          )}
          fav={fav}
          onToggleFav={toggleFav}
        />
      </TabsContent>
      <TabsContent value="fav">
        <LocationCard
          locations={locationData.filter(
            (location) => location.category === "fav"
          )}
          fav={fav}
          onToggleFav={toggleFav}
        />
      </TabsContent>
    </Tabs>
  );
}
