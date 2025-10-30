export type Filters = {
  search: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  amenities: string[];
  locations: string[];
  maxCapacity: string;
  roomType: string;
  latitude?: number;
  longitude?: number;
  radius?: number; // in kilometers
};
