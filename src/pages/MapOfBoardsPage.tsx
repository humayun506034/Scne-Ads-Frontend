import Loading from "@/common/MapLoading";
import { MapOfBoards } from "@/components/Modules/MapOfBoards/MapOfBoards";
import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import { Screen } from "@/types/locations";
import { useMemo } from "react";

export function MapOfBoardPage() {
  const { data, isLoading } = useGetAllScreenQuery({ limit: 100000, page: "1" });


  
  const screens: Screen[] = useMemo(() => {
    if (!data?.data?.data) return [];
    return data.data.data;
  }, [data]);


 
  const defaultMapCenter = useMemo(() => {
    if (screens.length > 0 && screens[0].lat && screens[0].lng) {
      return {
        lat: parseFloat(screens[0].lat),
        lng: parseFloat(screens[0].lng),
      };
    }
    return { lat: 23.8103, lng: 90.4125 };
  }, [screens]);


  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className=""><Loading/></div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <MapOfBoards screens={screens} defaultCenter={defaultMapCenter} />
    </div>
  );
}
