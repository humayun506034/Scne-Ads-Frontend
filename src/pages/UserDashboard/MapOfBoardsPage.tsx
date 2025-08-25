import { useMemo, useState } from "react";

import {
  defaultFilters,
  FilterOptions,
  SelectionSummary,
} from "@/components/Modules/UserDashboard/MapOfBoards";
import { FilterSidebar } from "@/components/Modules/UserDashboard/MapOfBoards/FilterSidebar";
import { MapOfBoards } from "@/components/Modules/UserDashboard/MapOfBoards/MapOfBoards";
import { SelectionSummaryComponent } from "@/components/Modules/UserDashboard/MapOfBoards/SelectionSummary";
import { locationData } from "@/lib/Data";

export function MapOfBoardPage() {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Filter locations based on current filters
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

  // Calculate selection summary
  const selectionSummary = useMemo((): SelectionSummary => {
    const selected = locationData.filter((location) =>
      selectedLocations.includes(location.id)
    );
    const totalReach = selected.reduce(
      (sum, location) => sum + location.reach,
      0
    );
    const averagePrice =
      selected.length > 0
        ? selected.reduce((sum, location) => sum + location.price, 0) /
          selected.length
        : 0;

    return {
      selectedCount: selected.length,
      totalReach,
      averagePrice: Math.round(averagePrice),
      radius: 32, // Mock radius calculation
    };
  }, [selectedLocations]);

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
  const mapCenter = { lat: 40.7589, lng: -73.9851 };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Target Location</h1>
          <p className="text-gray-600 mt-1">
            Select billboard locations for your campaign
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            selectedCount={selectedLocations.length}
            onClearFilters={handleClearFilters}
          />

          {/* Map Container */}
          <div className="flex-1 relative rounded-lg overflow-hidden shadow-lg">
            <SelectionSummaryComponent summary={selectionSummary} />
            <MapOfBoards
              locations={filteredLocations}
              selectedLocations={selectedLocations}
              onLocationSelect={handleLocationSelect}
              center={mapCenter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
