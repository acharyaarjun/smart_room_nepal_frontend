import { Media } from "../common/media";

export type RoomForm = {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  offerPrice?: number;
  longitude: number | string;
  latitude: number | string;
  districtId: number;
  address: string;
  roomType: string; // @/enums/roomType.ts (either one value of enum RoomType)
  maxCapacity: string; // @/enums/maxCapacity.ts (either one value of enum MaxCapacity)
  image?: File; // this is required only when creating a new room
  unit: string; // @/enums/roomUnit.ts (either one value of enum RoomUnit)
};

export type Room = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  offerPrice: number | null;
  unit: string;
  longitude: number;
  latitude: number;
  districtId: number;
  address: string;
  roomType: string; // @/enums/roomType.ts (either one value of enum RoomType)
  maxCapacity: string; // @/enums/maxCapacity.ts (either one value of enum MaxCapacity)
  roomStatus: string; //@/enums/roomStatus.ts (either one value of enum RoomStatus)
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  district: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
  image: Media | null;
};
