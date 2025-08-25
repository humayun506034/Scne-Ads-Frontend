
export interface MapConfig {
    center: [number, number]
    zoom: number
    minZoom: number
    maxZoom: number
}

export const mapConfig = {
    center: [20, 0] as [number, number],
    zoom: 1,
    minZoom: 1,
    maxZoom: 18,
}
