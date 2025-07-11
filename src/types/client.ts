import type { IDateValue, ISocialLink } from './common';

// ----------------------------------------------------------------------

export type IClientTableFilters = {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: IDateValue;
};

export type IClientProfileCover = {
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
};

export type IClientProfile = {
  id: string;
  role: string;
  quote: string;
  email: string;
  school: string;
  country: string;
  company: string;
  totalFollowers: number;
  totalFollowing: number;
  socialLinks: ISocialLink;
};

export type IClientProfileFollower = {
  id: string;
  name: string;
  country: string;
  avatarUrl: string;
};

export type IClientProfileGallery = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: IDateValue;
};

export type IClientProfileFriend = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IClientProfilePost = {
  id: string;
  media: string;
  message: string;
  createdAt: IDateValue;
  personLikes: { name: string; avatarUrl: string }[];
  comments: {
    id: string;
    message: string;
    createdAt: IDateValue;
    author: { id: string; name: string; avatarUrl: string };
  }[];
};

export type IClientCard = {
  id: string;
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
};

export type IClientItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  addresses: {
    address: string;
    city: string;
    state: string;
  }[];
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
  createdAt: IDateValue;
};

export type IClientAccountBillingHistory = {
  id: string;
  price: number;
  invoiceNumber: string;
  createdAt: IDateValue;
};
