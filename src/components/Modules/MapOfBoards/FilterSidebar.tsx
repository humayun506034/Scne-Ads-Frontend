/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { FilterOptions } from ".";

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
          className="w-full bg-bg-dashboard border-[#3A5A8E] text-white "
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {selectedCount > 0 && `(${selectedCount})`}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-120  min-h-[70dvh]  bg-[#16294E] rounded-lg p-6 h-fit">
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
        <div className="lg:hidden fixed inset-0 z-50 bg-bg-dashboard">
          <div className="fixed right-0 top-0 h-full w-80 bg-dashboard-card-bg p-6 overflow-y-auto">
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
  // filters,
  // updateFilter,
  // toggleArrayFilter,
  onClearFilters,
}: // selectedCount,
{
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
      <div className="">
        <div className="text-xs flex justify-start  items-center gap-3  mb-2 text-[#14CA74]">
          <p> Skip this step</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M1.16699 6.99935H12.8337M12.8337 6.99935L7.00033 1.16602M12.8337 6.99935L7.00033 12.8327"
              stroke="#14CA74"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
        </div>
        <h2 className="text-2xl md:text-4xl font-semibold text-white">
          Select Boards
        </h2>
        <button
          style={{
            borderRadius: "8px",
            border: "1px solid var(--Linear, #38B6FF)",
            background: "#0B1739",
          }}
          onClick={onClearFilters}
          className="flex w-full  py-3  justify-center  my-4  items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <mask
              id="mask0_761_1545"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_761_1545)">
              <path
                d="M11.0001 20C10.7167 20 10.4792 19.9042 10.2876 19.7125C10.0959 19.5208 10.0001 19.2833 10.0001 19V13L4.20008 5.6C3.95008 5.26667 3.91258 4.91667 4.08758 4.55C4.26258 4.18333 4.56675 4 5.00008 4H19.0001C19.4334 4 19.7376 4.18333 19.9126 4.55C20.0876 4.91667 20.0501 5.26667 19.8001 5.6L14.0001 13V19C14.0001 19.2833 13.9042 19.5208 13.7126 19.7125C13.5209 19.9042 13.2834 20 13.0001 20H11.0001ZM12.0001 12.3L16.9501 6H7.05008L12.0001 12.3Z"
                fill="#14CA74"
              />
            </g>
          </svg>
          <p>Filter</p>
        </button>
      </div>

      {/* Description */}
      <div className="text-gray-300 text-sm">
        <p>Add head boards in my life</p>
        <p className="text-xs text-gray-400 mt-1">
          Select from available billboard locations to create your campaign
        </p>
      </div>

      {/* Location Search */}
      {/* <div className="space-y-2">
        <Label className="text-white text-sm">Location</Label>
        <Input
          placeholder="Search location..."
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="bg-[#1a2332] border-[#3A5A8E] text-white placeholder:text-gray-400"
        />
      </div> */}

      {/* Price Range */}
      {/* <Collapsible defaultOpen>
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
      </Collapsible> */}

      {/* Reach Range */}
      {/* <Collapsible defaultOpen>
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
      </Collapsible> */}

      {/* Billboard Size */}
      {/* <Collapsible defaultOpen>
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
      </Collapsible> */}

      {/* Billboard Type */}
      {/* <Collapsible defaultOpen>
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
      </Collapsible> */}

      {/* Availability */}
      {/* <Collapsible defaultOpen>
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
      </Collapsible> */}

      {/* Selected Count */}
      {/* {selectedCount > 0 && (
        <div className="bg-[#1a2332] rounded-lg p-3 border border-[#3A5A8E]">
          <p className="text-sm text-white">
            <span className="font-semibold">{selectedCount}</span> boards
            selected
          </p>
        </div>
      )} */}
    </div>
  );
}
