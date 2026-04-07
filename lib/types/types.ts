
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


export type MediaType = "movie" | "series";
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