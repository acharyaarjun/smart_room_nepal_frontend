export type RoomAmenity = {
  id: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  amenity: {
    id: number;
    name: string;
    description: string | null;
    icon: string;
    createdAt: string;
    updatedAt: string;
  };
};
