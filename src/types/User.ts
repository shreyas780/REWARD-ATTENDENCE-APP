export interface User {
  usn: string;
  email: string;
  phone: string;
  password: string; // This will be hashed
  createdAt: string;
}

export interface LoginCredentials {
  usn: string;
  password: string;
}

export interface RegisterData {
  usn: string;
  password: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}