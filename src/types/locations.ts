export interface Screen {
  id: string;
  slug: string;
  screen_name: string;
  title?: string;
  reach ?: number;
  campaigns ?: number;
  category ?: "new" | "fav" | "top";
  screenSize?: string;
  tierLevel ?: "Basic" | "Standard" | "Premium";
  costPerPlay?: number;
  screen_size: string; 
  resolution: string; 
  description: string;
  location: string;
  lat: string;
  lng: string; 


  imageUrls: {
    url: string;
    index?: string | number; 
    id?: string;
  }[];


  price: number;
  availability: 'available' | 'booked' | 'maintenance' | string;
  status: 'active' | 'inactive' | string;
  isFeatured: boolean;
  isDeleted: boolean;

 
  createdAt: string; 
  updatedAt: string;
}

export interface LocationCardProps {
  location: ILocation;
  fav?: Set<string>;
  bookmark?: boolean;
  select?: boolean;
  onToggleFav?: (id: string) => void;
  showButton?: boolean;
  imageUrls?: { url: string,id:string }[];
}


export interface ILocation {
  id: string;
  imageUrls: { url: string,id:string }[];
  title: string;
  lat: number;
  lng: number;
  availability: "available" | "booked" | "maintenance";
  reach: number;
  price: number;
  campaigns: number;
  category: "new" | "fav" | "top"; 
  screenSize: string;
  description: string;
  status: "active" | "inactive" | "maintenance"; 
  location: string;
  tierLevel: "Basic" | "Standard" | "Premium"; 
  costPerPlay: number;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ScreenListData {
  data: Screen[];
  meta: Meta;
}

export interface AllScreenApiResponse {
  success: boolean;
  message: string;
  data: ScreenListData;
}