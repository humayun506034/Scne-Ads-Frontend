export interface BillboardLocation {
    id: string
    name: string
    city: string
    country: string
    lat: number
    lng: number
    status: "active" | "inactive" | "maintenance"
    campaigns: number
    description?: string
    image?: string
}

export interface MapConfig {
    center: [number, number]
    zoom: number
    minZoom: number
    maxZoom: number
}


export const billboardLocations: BillboardLocation[] = [
    // North America
    {
        id: "nyc-times-square",
        name: "Times Square Digital",
        city: "New York",
        country: "USA",
        lat: 40.758,
        lng: -73.9855,
        status: "active",
        campaigns: 12,
        description: "Premium digital billboard in the heart of Times Square",
        image:
            "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1",
    },
    {
        id: "la-sunset-strip",
        name: "Sunset Strip Billboard",
        city: "Los Angeles",
        country: "USA",
        lat: 34.09,
        lng: -118.385,
        status: "active",
        campaigns: 8,
        description: "Iconic billboard location on the famous Sunset Strip",
    },
    {
        id: "toronto-downtown",
        name: "Toronto Financial District",
        city: "Toronto",
        country: "Canada",
        lat: 43.6532,
        lng: -79.3832,
        status: "active",
        campaigns: 5,
        description: "High-traffic digital display in downtown Toronto",
    },

    // Europe
    {
        id: "london-piccadilly",
        name: "Piccadilly Circus",
        city: "London",
        country: "UK",
        lat: 51.51,
        lng: -0.1347,
        status: "active",
        campaigns: 15,
        description: "Iconic curved LED screen at Piccadilly Circus",
        image:
            "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1",
    },
    {
        id: "paris-champs-elysees",
        name: "Champs-Élysées Digital",
        city: "Paris",
        country: "France",
        lat: 48.8698,
        lng: 2.3076,
        status: "active",
        campaigns: 9,
        description: "Premium advertising space on the famous avenue",
    },
    {
        id: "berlin-potsdamer",
        name: "Potsdamer Platz",
        city: "Berlin",
        country: "Germany",
        lat: 52.5096,
        lng: 13.3762,
        status: "maintenance",
        campaigns: 3,
        description: "Modern digital billboard in Berlin's commercial center",
    },

    // Asia
    {
        id: "tokyo-shibuya",
        name: "Shibuya Crossing",
        city: "Tokyo",
        country: "Japan",
        lat: 35.6598,
        lng: 139.7006,
        status: "active",
        campaigns: 18,
        description: "World's busiest pedestrian crossing digital displays",
        image:
            "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1",
    },
    {
        id: "singapore-orchard",
        name: "Orchard Road",
        city: "Singapore",
        country: "Singapore",
        lat: 1.3048,
        lng: 103.8318,
        status: "active",
        campaigns: 7,
        description: "Premium shopping district digital advertising",
    },
    {
        id: "hong-kong-central",
        name: "Central District",
        city: "Hong Kong",
        country: "Hong Kong",
        lat: 22.2783,
        lng: 114.1747,
        status: "active",
        campaigns: 11,
        description: "High-impact displays in Hong Kong's business district",
    },

    // Australia
    {
        id: "sydney-circular-quay",
        name: "Circular Quay",
        city: "Sydney",
        country: "Australia",
        lat: -33.8615,
        lng: 151.2055,
        status: "active",
        campaigns: 6,
        description: "Waterfront digital billboard with harbor views",
    },

    // South America
    {
        id: "sao-paulo-paulista",
        name: "Avenida Paulista",
        city: "São Paulo",
        country: "Brazil",
        lat: -23.5613,
        lng: -46.6563,
        status: "active",
        campaigns: 4,
        description: "Major avenue digital advertising in Brazil's largest city",
    },

    // Africa
    {
        id: "cape-town-waterfront",
        name: "V&A Waterfront",
        city: "Cape Town",
        country: "South Africa",
        lat: -33.903,
        lng: 18.4197,
        status: "inactive",
        campaigns: 2,
        description: "Tourist destination digital displays",
    },

    // Middle East
    {
        id: "dubai-mall",
        name: "Dubai Mall",
        city: "Dubai",
        country: "UAE",
        lat: 25.1972,
        lng: 55.2796,
        status: "active",
        campaigns: 13,
        description: "World's largest shopping mall digital advertising",
    },
]

export const mapConfig = {
    center: [20, 0] as [number, number],
    zoom: 1,
    minZoom: 1,
    maxZoom: 18,
}
