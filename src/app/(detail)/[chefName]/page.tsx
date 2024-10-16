"use client";
import RestaurantList from "@/app/components/chefDetailPage/RestaurantList";
import KakaoMap from "@/app/components/map/KakaoMap";
import { supabase } from "@/lib/supabaseClient";
import { Chefs, Restaurant } from "@/types/info";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  params: { chefName: string };
};

const ChefDetailPage = ({ params }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [chefData, setChefData] = useState<Chefs | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const handleMoveToLocation = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  useEffect(() => {
    const decodedChefName = decodeURIComponent(params.chefName);

    const fetchData = async () => {
      const { data, error } = await supabase.from("chef").select("*, restaurant(*)").eq("chef_name", decodedChefName);

      if (error) {
        console.error("Error:", error.message);
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }

      setChefData(data[0]);
      setRestaurants(data[0].restaurant);
    };

    fetchData();
  }, [params.chefName]);

  if (chefData)
    return (
      <div className="flex justify-around items-center min-h-[calc(100vh-56px)]">
        <div className="flex flex-col justify-center items-center gap-[30px] w-[800px]">
          <Image
            src={
              chefData.chef_img_url ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-VorlNYtHd0lxv9dRjs7a9PKdWuEEkXkbg&s"
            }
            alt={chefData.chef_name}
            width={413}
            height={261}
          />
          {chefData.chef_img_url ? null : <h1 className="text-lg font-bold my-[30px]">{chefData.chef_name}</h1>}
          <RestaurantList restaurants={restaurants} data={chefData} handleMoveToLocation={handleMoveToLocation} />
        </div>
        <KakaoMap
          restaurants={restaurants}
          selectedLocation={selectedLocation}
          size={{ width: "1100px", height: "800px" }}
        />
      </div>
    );
};

export default ChefDetailPage;
