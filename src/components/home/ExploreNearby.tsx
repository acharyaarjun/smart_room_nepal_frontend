import { District } from "@/types/user/district";
import { getProxiedImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ExploreNearbyProps {
  districts: District[];
}

export default function ExploreNearby({ districts }: ExploreNearbyProps) {
  return (
    <section id="expolore-nearby" className="w-full py-12">
      <div className="container">
        <div className="w-full text-center">
          <h1 className="font-bold text-5xl capitalize mb-8">Explore Nearby</h1>
        </div>
        <div className="w-full flex flex-wrap justify-center items-center gap-6">
          {districts.map((district) => (
            <div key={district.id} className="">
              <Image
                src={
                  district.image
                    ? getProxiedImageUrl(district.image.url)
                    : "/placeholder.jpg"
                }
                alt={district.name}
                className="w-42 h-42 object-cover rounded-full"
                width={500}
                height={300}
              />
              <div className="text-center py-2">
                <Link href={"#"} className="font-medium text-lg">
                  {district.name}
                </Link>
                <p className="text-sm text-gray-500">{district.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
