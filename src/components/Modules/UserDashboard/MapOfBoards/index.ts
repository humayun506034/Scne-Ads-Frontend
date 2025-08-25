export const defaultFilters = {
    priceRange: [0, 500] as [number, number],
    reach: [0, 100000] as [number, number],
    size: [],
    type: [],
    availability: ["available"],
    location: "",
}

export const filterOptions = {
    sizes: ["24x8", "24x12", "36x12", "48x14"],
    types: ["digital", "static"],
    availability: ["available", "booked", "maintenance"],
}


export interface FilterOptions {
    priceRange: [number, number]
    reach: [number, number]
    size: string[]
    type: string[]
    availability: string[]
    location: string
}

export interface SelectionSummary {
    selectedCount: number
    totalReach: number
    averagePrice: number
    radius: number
}
