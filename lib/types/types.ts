
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
