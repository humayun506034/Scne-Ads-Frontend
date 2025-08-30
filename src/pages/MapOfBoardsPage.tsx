import { useMemo, useState } from "react";

import {
  defaultFilters,
  FilterOptions,
} from "@/components/Modules/MapOfBoards";
import { MapOfBoards } from "@/components/Modules/MapOfBoards/MapOfBoards";
import { locationData } from "@/lib/Data";

export function MapOfBoardPage() {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const filteredLocations = useMemo(() => {
    return locationData.filter((location) => {
      // Price range filter
      if (
        location.price < filters.priceRange[0] ||
        location.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Reach filter
      if (
        location.reach < filters.reach[0] ||
        location.reach > filters.reach[1]
      ) {
        return false;
      }

      // Size filter
      if (
        filters.size.length > 0 &&
        !filters.size.includes(location.screenSize)
      ) {
        return false;
      }

      // Type filter
      if (
        filters.type.length > 0 &&
        !filters.type.includes(location.category)
      ) {
        return false;
      }

      // Availability filter
      if (
        filters.availability.length > 0 &&
        !filters.availability.includes(location.availability)
      ) {
        return false;
      }

      // Location search filter
      if (
        filters.location &&
        !location.location
          .toLowerCase()
          .includes(filters.location.toLowerCase()) &&
        !location.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );

    console.log("Location selected:", locationId);
    console.log("Current selection:", selectedLocations);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    console.log("Filters cleared");
  };

  // Default map center (New York City)
  const mapCenter = { lat: 51.5074, lng: -0.128 };

  return (
    <div className=" h-screen">
      <MapOfBoards
        filters={filters}
        selectedCount={selectedLocations.length}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        locations={filteredLocations}
        selectedLocations={selectedLocations}
        onLocationSelect={handleLocationSelect}
        center={mapCenter}
      />
    </div>
  );
}
