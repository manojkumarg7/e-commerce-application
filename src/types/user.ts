export type UserAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  address?: UserAddress;
};
