/* eslint-disable @typescript-eslint/no-explicit-any */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  image?: string;
  subscriptions?: Array<{
    id: string;
    status: string;
  }> | null;
}


export type MediaType = "Movie" | "Series";
export type PriceType = "Free" | "Premium";
export type Genre = string;
export interface Media {
  id: string;
  type: MediaType;
  title: string;
  coverImage: string | undefined;
  backdropImage?: string;
  synopsis: string;
  fullSynopsis?: string;
  genre: Genre[];
  releaseYear: number;
  director: string;
  cast: string[];
  platform: string;
  priceType: PriceType;          
  youtubeLink: string;

  averageRating: number;
  totalReviews: number;

  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  login: (userData: User) => void;
  logout: () => void;
}

export interface NavbarProps {
  user?: User | null;
  onLogout?: () => void;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  image?: string;
}

export interface MediaCardProps {
  item: {
    id: string;
    title: string;
    coverImage: string;
    averageRating: number;
    releaseYear: number;
    genre?: string;
    type?: "Movie" | "Series";
    totalRatings?: number;
  };
}

export interface CreateReviewData {
  mediaId: string;
  rating: number;
  content: string;
  tags: string[];
  isSpoiler: boolean;
}


export interface DashboardStats {
  totalMedia: number;
  totalUsers: number;
  totalReviews: number;
  totalComments: number;
  averageRating: number;
  pendingReviews: number;
  trendingMedia: number;
  monthlyGrowth?: number;
  activeUsers?: number;
  recentActivities?: any[];
}


export interface Review {
  id: string;
  content: string;
  rating: number;
  isApproved: boolean;
  isSpoiler: boolean;   
  tags: string[]; 
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  media?: {
    id: string;
    title: string;
    type: string;
  };
}

export interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  review?: {
    id: string;
    mediaTitle?: string;
    rating: number;
    content: string;
  };
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface UserActivity {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  role?: string;
  _count: {
    reviews: number;
    comments: number;
    watchlist: number;
  };
}

export interface Subscription {
  id: string;
  plan: string;
  status: "active" | "canceled" | "expired" | "pending";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SubscriptionAnalytics {
  total: number;
  active: number;
  canceled: number;
  activePercentage: number;
  planDistribution: Array<{ plan: string; count: number; percentage: number }>;
}