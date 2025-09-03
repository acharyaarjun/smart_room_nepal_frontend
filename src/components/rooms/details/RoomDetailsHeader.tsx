import { FaShareAlt, FaHeart } from "react-icons/fa";

interface Props {
  title: string;
  location: string;
  price: number;
  rating: number;
}

export default function RoomDetailsHeader({
  title,
  location,
  price,
  rating,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{location}</p>
        <p className="text-xl font-semibold text-primary mt-2">
          Rs. {price}/month
        </p>
        <p className="text-sm text-yellow-500">⭐ {rating}/5</p>
      </div>
      <div className="flex gap-3">
        <button className="p-2 rounded-full border hover:bg-gray-100">
          <FaShareAlt />
        </button>
        <button className="p-2 rounded-full border hover:bg-gray-100">
          <FaHeart />
        </button>
      </div>
    </div>
  );
}
