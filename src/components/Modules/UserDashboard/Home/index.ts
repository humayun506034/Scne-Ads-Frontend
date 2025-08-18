import { Calculator, Eye, Home, LayoutDashboard, MapPin, Settings, Upload } from "lucide-react";
import img from '../../../../assets/featured.jpg';
export const navItems = [
    {
        title: "See Locations",
        icon: MapPin,
        href: "/dashboard/locations",
    },
    {
        title: "Cost Estimator",
        icon: Calculator,
        href: "/dashboard/estimator",
    },
    {
        title: "Map of Boards",
        icon: Eye,
        href: "/dashboard/map",
    },
];

export const sidebarItems = [
    {
        title: "MY SCNE",
        items: [
            {
                title: "Home",
                icon: Home,
                href: "/user-dashboard",
            },
            {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/user-dashboard/metrics",
            },

        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Campaign Management",
                icon: Settings,
                href: "/user-dashboard/campaigns",
            },
        ],
    },
    {
        title: "Media",
        items: [
            {
                title: "My Uploads",
                icon: Upload,
                href: "/user-dashboard//uploads",
            },
        ],
    },

];
export interface LocationCard {
    id: string
    title: string
    description: string
    image: string
    isFavorite?: boolean
    category: "new-arrivals" | "top-sellers" | "favourites"
}

export type TabType = "new-arrivals" | "top-sellers" | "favourites"





export const newArrivals = [
    {
        id: "1",
        image: img,
        title: "Piccadilly Circus, London",
        description: "Dominate a key European intersection with iconic digital billboards.",
    },
    {
        id: "2",
        image: img,
        title: "Times Square, NYC",
        description: "Reach millions in the heart of global commerce and entertainment.",
    },
    {
        id: "3",
        image: img,
        title: "Shibuya Crossing, Tokyo",
        description: "Capture the attention of millions at the world’s busiest pedestrian crossing.",
    },
    {
        id: "4",
        image: img,
        title: "Champs-Élysées, Paris",
        description: "Showcase your brand on the most famous avenue in Paris.",
    },
    {
        id: "5",
        image: img,
        title: "Gangnam District, Seoul",
        description: "Display your message in South Korea’s trendiest neighborhood.",
    },
    {
        id: "6",
        image: img,
        title: "Sydney Harbour, Sydney",
        description: "Iconic views and massive audience in Sydney’s core.",
    },
    {
        id: "7",
        image: img,
        title: "Gangnam District, Seoul",
        description: "Display your message in South Korea’s trendiest neighborhood.",
    },
    {
        id: "8",
        image: img,
        title: "Sydney Harbour, Sydney",
        description: "Iconic views and massive audience in Sydney’s core.",
    },
];

export const topSellers = [
    {
        id: "1",
        image: img,
        title: "Las Vegas Strip",
        description: "Stand out in the entertainment capital of the world.",
    },
    {
        id: "2",
        image: img,
        title: "Hollywood Boulevard, Los Angeles",
        description: "Promote your brand on the world-famous walk of fame.",
    },
    {
        id: "3",
        image: img,
        title: "Central Park South, NYC",
        description: "Reach tourists and locals alike in New York’s green heart.",
    },
    {
        id: "4",
        image: img,
        title: "Potsdamer Platz, Berlin",
        description: "A prime spot in Berlin for innovative outdoor advertising.",
    },
    {
        id: "5",
        image: img,
        title: "Marina Bay, Singapore",
        description: "Premium exposure at Singapore’s most prestigious waterfront.",
    },
    {
        id: "6",
        image: img,
        title: "Downtown Dubai",
        description: "The largest mall and entertainment center in the Middle East.",
    },
    {
        id: "7",
        image: img,
        title: "Marina Bay, Singapore",
        description: "Premium exposure at Singapore’s most prestigious waterfront.",
    },
    {
        id: "8",
        image: img,
        title: "Downtown Dubai",
        description: "The largest mall and entertainment center in the Middle East.",
    },
];

export const favourites = [
    {
        id: "1",
        image: img,
        title: "Sydney CBD",
        description: "Connect with Sydney’s bustling business audience.",
    },
    {
        id: "2",
        image: img,
        title: "Union Square, San Francisco",
        description: "Attract attention in the heart of Silicon Valley.",
    },
    {
        id: "3",
        image: img,
        title: "Oxford Street, London",
        description: "London’s busiest shopping street – get noticed.",
    },
    {
        id: "4",
        image: img,
        title: "Buckhead, Atlanta",
        description: "Premium digital boards in Atlanta’s luxury district.",
    },
    {
        id: "5",
        image: img,
        title: "Yonge-Dundas Square, Toronto",
        description: "Toronto’s answer to Times Square, with massive reach.",
    },
    {
        id: "6",
        image: img,
        title: "Downtown Miami",
        description: "Engage locals and tourists in a dynamic, thriving city.",
    },
    {
        id: "7",
        image: img,
        title: "Yonge-Dundas Square, Toronto",
        description: "Toronto’s answer to Times Square, with massive reach.",
    },
    {
        id: "8",
        image: img,
        title: "Downtown Miami",
        description: "Engage locals and tourists in a dynamic, thriving city.",
    },
];

