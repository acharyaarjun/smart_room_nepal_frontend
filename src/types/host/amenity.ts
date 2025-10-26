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
    updatedAt: string;
    createdAt: string;
  };
};

export type AmenityForm = {
  amenityId: number;
  description: string | null;
};
