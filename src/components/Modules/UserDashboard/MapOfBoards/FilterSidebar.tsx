/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Filter, X } from "lucide-react";
import { useState } from "react";
import { filterOptions, FilterOptions } from ".";

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  selectedCount: number;
  onClearFilters: () => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  selectedCount,
  onClearFilters,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (
    key: "size" | "type" | "availability",
    value: string
  ) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full bg-[#2B4C7E] border-[#3A5A8E] text-white hover:bg-[#3A5A8E]"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {selectedCount > 0 && `(${selectedCount})`}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-[#2B4C7E] rounded-lg p-6 h-fit">
        <FilterContent
          filters={filters}
          updateFilter={updateFilter}
          toggleArrayFilter={toggleArrayFilter}
          onClearFilters={onClearFilters}
          selectedCount={selectedCount}
        />
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="fixed right-0 top-0 h-full w-80 bg-[#2B4C7E] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Filters</h2>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-[#3A5A8E]"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <FilterContent
              filters={filters}
              updateFilter={updateFilter}
              toggleArrayFilter={toggleArrayFilter}
              onClearFilters={onClearFilters}
              selectedCount={selectedCount}
            />
          </div>
        </div>
      )}
    </>
  );
}

function FilterContent({
  filters,
  updateFilter,
  toggleArrayFilter,
  onClearFilters,
  selectedCount,
}: {
  filters: FilterOptions;
  updateFilter: (key: keyof FilterOptions, value: any) => void;
  toggleArrayFilter: (
    key: "size" | "type" | "availability",
    value: string
  ) => void;
  onClearFilters: () => void;
  selectedCount: number;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Select Boards</h2>
        <Button
          onClick={onClearFilters}
          variant="ghost"
          size="sm"
          className="text-blue-400 hover:text-blue-300 hover:bg-[#3A5A8E]"
        >
          Clear All
        </Button>
      </div>

      {/* Description */}
      <div className="text-gray-300 text-sm">
        <p>Add head boards in my life</p>
        <p className="text-xs text-gray-400 mt-1">
          Select from available billboard locations to create your campaign
        </p>
      </div>

      {/* Location Search */}
      <div className="space-y-2">
        <Label className="text-white text-sm">Location</Label>
        <Input
          placeholder="Search location..."
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="bg-[#1a2332] border-[#3A5A8E] text-white placeholder:text-gray-400"
        />
      </div>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-blue-400">
          <span className="text-sm font-medium">Price Range ($/day)</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                updateFilter("priceRange", value as [number, number])
              }
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Reach Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-blue-400">
          <span className="text-sm font-medium">Daily Reach</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 mt-3">
          <div className="px-2">
            <Slider
              value={filters.reach}
              onValueChange={(value) =>
                updateFilter("reach", value as [number, number])
              }
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{(filters.reach[0] / 1000).toFixed(0)}k</span>
            <span>{(filters.reach[1] / 1000).toFixed(0)}k</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Billboard Size */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-blue-400">
          <span className="text-sm font-medium">Billboard Size</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          {filterOptions.sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.size.includes(size)}
                onCheckedChange={() => toggleArrayFilter("size", size)}
                className="border-gray-400 data-[state=checked]:bg-blue-500"
              />
              <Label htmlFor={`size-${size}`} className="text-sm text-gray-300">
                {size} ft
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Billboard Type */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-blue-400">
          <span className="text-sm font-medium">Type</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          {filterOptions.types.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.type.includes(type)}
                onCheckedChange={() => toggleArrayFilter("type", type)}
                className="border-gray-400 data-[state=checked]:bg-blue-500"
              />
              <Label
                htmlFor={`type-${type}`}
                className="text-sm text-gray-300 capitalize"
              >
                {type}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Availability */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-white hover:text-blue-400">
          <span className="text-sm font-medium">Availability</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          {filterOptions.availability.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`availability-${status}`}
                checked={filters.availability.includes(status)}
                onCheckedChange={() =>
                  toggleArrayFilter("availability", status)
                }
                className="border-gray-400 data-[state=checked]:bg-blue-500"
              />
              <Label
                htmlFor={`availability-${status}`}
                className="text-sm text-gray-300 capitalize"
              >
                {status}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Selected Count */}
      {selectedCount > 0 && (
        <div className="bg-[#1a2332] rounded-lg p-3 border border-[#3A5A8E]">
          <p className="text-sm text-white">
            <span className="font-semibold">{selectedCount}</span> boards
            selected
          </p>
        </div>
      )}
    </div>
  );
}
