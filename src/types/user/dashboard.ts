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

export type DashboardRoom = {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  roomType: string;
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
  status: string;
  price: number;
  acceptedPrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  room: DashboardRoom;
};

export type DashboardStats = {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  canceledRequests: number;
  ongoingRequests: number;
  completedRequests: number;
  totalWishlists: number;
  totalRecentlyViewed: number;
  totalReviews: number;
};

export type Dashboard = {
  stats: DashboardStats;
  recentRequests: DashboardRequest[];
};
