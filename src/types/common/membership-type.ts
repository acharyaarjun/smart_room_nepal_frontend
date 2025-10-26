export type MembershipType = {
  id: number;
  name: string;
  description: string;
  slug: string;
  limit: number;
  price: number;
  features: string;
};

export type MembershipPayment = {
  id: number;
  amount: number;
  paymentDate: string;
  expiryDate: string;
  transactionId: string;
  status: string;
  paymentMethod: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
  membershipType: MembershipType;
};
