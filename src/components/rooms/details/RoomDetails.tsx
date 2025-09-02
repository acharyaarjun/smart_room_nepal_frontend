import {
  RoomGallery,
  RoomDetailsHeader,
  RoomAmenities,
  RoomDescription,
  RoomOwnerCard,
  RoomLocationMap,
} from "@/components/rooms/details";

import roomImageOne from "@/assets/images/rooms/1.jpg";
import roomImageTwo from "@/assets/images/rooms/2.jpg";
import roomImageThree from "@/assets/images/rooms/3.jpg";
import roomImageFour from "@/assets/images/rooms/4.jpg";
export default function RoomDetails() {
  return (
    <section className="w-full py-10">
      <div className="container ">
        {/* Left Content */}

        <RoomDetailsHeader
          title="Spacious 2BHK in Kathmandu"
          location="Baneshwor, Kathmandu"
          price={15000}
          rating={4.5}
        />

        <RoomGallery
          images={[
            roomImageOne.src,
            roomImageTwo.src,
            roomImageThree.src,
            roomImageFour.src,
          ]}
        />
        <RoomDescription description="This spacious 2BHK apartment is perfect for families or students. It includes a modern kitchen, balcony, and is close to public transport." />
        <RoomAmenities />
        <RoomLocationMap lat={27.7172} lng={85.324} />
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        <RoomOwnerCard
          name="Ram Bahadur"
          phone="+977 9812345678"
          email="ram@example.com"
        />
      </div>
    </section>
  );
}
