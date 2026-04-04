
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  image?: string;
}

export interface NavbarProps {
  user?: User | null;
  onLogout?: () => void;
}
