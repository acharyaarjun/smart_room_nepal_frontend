import Image from "next/image";

export default function RoomGallery({ images }: { images: string[] }) {
  return (
    <div>
      <div className="w-full h-72 md:h-96 relative rounded-xl overflow-hidden">
        <Image src={images[0]} alt="Room Image" fill className="object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3">
        {images.slice(1, 5).map((img, i) => (
          <div key={i} className="relative h-20 rounded-lg overflow-hidden">
            <Image
              src={img}
              alt="Room Thumbnail"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
