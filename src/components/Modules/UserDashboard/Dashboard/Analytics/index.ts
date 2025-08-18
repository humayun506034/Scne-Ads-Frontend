export interface MetricData {
    value: string
    growth: number
    isPositive: boolean
}

export interface ChartDataPoint {
    x: string | number
    y: number
}

export interface AnalyticsData {
    totalSpend: MetricData
    totalConversions: MetricData
    totalClicks: MetricData
    liveVisitors: string
    spendData: ChartDataPoint[]
    impressionsData: ChartDataPoint[]
    conversionsData: ChartDataPoint[]
    clicksData: ChartDataPoint[]
}


export const analyticsData: AnalyticsData = {
    totalSpend: {
        value: "$185.3K",
        growth: 24.6,
        isPositive: true,
    },
    totalConversions: {
        value: "8,765",
        growth: 28.3,
        isPositive: true,
    },
    totalClicks: {
        value: "400",
        growth: 16.8,
        isPositive: true,
    },
    liveVisitors: "10k visitors",

    // Monthly spend data (Jan - Dec)
    spendData: [
        { x: "Jan", y: 850000 },
        { x: "Feb", y: 1200000 },
        { x: "Mar", y: 950000 },
        { x: "Apr", y: 1100000 },
        { x: "May", y: 1350000 },
        { x: "Jun", y: 2500000 }, // Highlighted point
        { x: "Jul", y: 2200000 },
        { x: "Aug", y: 1800000 },
        { x: "Sep", y: 2100000 },
        { x: "Oct", y: 1900000 },
        { x: "Nov", y: 1600000 },
        { x: "Dec", y: 1400000 },
    ],

    // Monthly impressions data
    impressionsData: [
        { x: "Jan", y: 650000 },
        { x: "Feb", y: 800000 },
        { x: "Mar", y: 750000 },
        { x: "Apr", y: 2500000 },
        { x: "May", y: 1100000 },
        { x: "Jun", y: 1300000 },
        { x: "Jul", y: 1250000 },
        { x: "Aug", y: 2550000 },
        { x: "Sep", y: 1200000 },
        { x: "Oct", y: 1050000 },
        { x: "Nov", y: 950000 },
        { x: "Dec", y: 850000 },
    ],

    // Hourly conversions data (12 AM - 11 PM)
    conversionsData: [
        { x: "12 AM", y: 120 },
        { x: "1 AM", y: 80 },
        { x: "2 AM", y: 60 },
        { x: "3 AM", y: 45 },
        { x: "4 AM", y: 35 },
        { x: "5 AM", y: 50 },
        { x: "6 AM", y: 85 },
        { x: "7 AM", y: 140 },
        { x: "8 AM", y: 180 },
        { x: "9 AM", y: 220 },
        { x: "10 AM", y: 280 },
        { x: "11 AM", y: 320 },
        { x: "12 PM", y: 380 },
        { x: "1 PM", y: 420 },
        { x: "2 PM", y: 450 },
        { x: "3 PM", y: 480 },
        { x: "4 PM", y: 520 },
        { x: "5 PM", y: 490 },
        { x: "6 PM", y: 460 },
        { x: "7 PM", y: 430 },
        { x: "8 PM", y: 380 },
        { x: "9 PM", y: 320 },
        { x: "10 PM", y: 250 },
        { x: "11 PM", y: 180 },
    ],

    // Hourly clicks data
    clicksData: [
        { x: "12 AM", y: 45 },
        { x: "1 AM", y: 35 },
        { x: "2 AM", y: 25 },
        { x: "3 AM", y: 20 },
        { x: "4 AM", y: 15 },
        { x: "5 AM", y: 25 },
        { x: "6 AM", y: 40 },
        { x: "7 AM", y: 65 },
        { x: "8 AM", y: 85 },
        { x: "9 AM", y: 120 },
        { x: "10 AM", y: 150 },
        { x: "11 AM", y: 180 },
        { x: "12 PM", y: 220 },
        { x: "1 PM", y: 280 },
        { x: "2 PM", y: 320 },
        { x: "3 PM", y: 380 },
        { x: "4 PM", y: 420 },
        { x: "5 PM", y: 380 },
        { x: "6 PM", y: 320 },
        { x: "7 PM", y: 280 },
        { x: "8 PM", y: 220 },
        { x: "9 PM", y: 180 },
        { x: "10 PM", y: 120 },
        { x: "11 PM", y: 80 },
    ],
}
