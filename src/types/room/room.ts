import { IconType } from "react-icons";

export type Amenity = {
  icon: IconType;
  label: string;
};

export type Room = {
  id: number;
  title: string;
  location: string;
  image: string;
  price: number;
  per: string;
  shortDescription?: string;
  featured?: boolean;
  rating?: number;
  amenities: Amenity[];
};
