export type Media = {
  url: string;
  fileName: string;
  path: string;
  mimeType: string;
};

export type District = {
  id: number;
  name: string;
  slug: string;
};

export type UserProfile = {
  phone: string | null;
  avatar: Media | null;
};

export type DashboardUser = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userProfile: UserProfile;
};

export type DashboardRoom = {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  roomType: string; // @/enums/roomType.ts
  image: Media;
};

export type TopRatedRoom = {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  roomType: string; // @/enums/roomType.ts
  roomStatus: string; // @/enums/roomStatus.ts
  isFeatured: boolean;
  image: Media;
  district: District;
};

export type DashboardRequest = {
  id: number;
  token: string;
  userId: number;
  roomId: number;
  isFixedDate: boolean;
  startDate: string | null;
  endDate: string | null;
  status: string; // @/enums/roomRequestStatus.ts
  price: number;
  acceptedPrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  room: DashboardRoom;
  user: DashboardUser;
};

export type HostDashboardStats = {
  totalRooms: number;
  approvedRooms: number;
  pendingRooms: number;
  maintenanceRooms: number;
  disabledByAdminRooms: number;
  disabledByOwnerRooms: number;
  featuredRooms: number;
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  ongoingRequests: number;
  completedRequests: number;
  totalReviews: number;
  averageRating: number;
  availableCredits: number;
};

export type Dashboard = {
  stats: HostDashboardStats;
  recentRequests: DashboardRequest[];
  topRatedRooms: TopRatedRoom[];
};
