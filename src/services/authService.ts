import { User, LoginCredentials, RegisterData, AuthResponse } from '../types/User';
import { hashPassword, verifyPassword } from '../utils/crypto';
import { getUserByUSN, saveUser, userExists } from '../utils/storage';

const CURRENT_USER_KEY = 'current_user';

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  try {
    // Validate input
    if (!data.usn || !data.password || !data.email || !data.phone) {
      return { success: false, message: 'All fields are required' };
    }

    // Check if user already exists
    if (userExists(data.usn)) {
      return { success: false, message: 'User with this USN already exists' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
      return { success: false, message: 'Please enter a valid 10-digit phone number' };
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user: User = {
      usn: data.usn.toUpperCase(),
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Save user
    saveUser(user);

    return { 
      success: true, 
      message: 'Registration successful',
      user: { usn: user.usn, email: user.email, phone: user.phone, createdAt: user.createdAt }
    };
  } catch (error) {
    return { success: false, message: 'Registration failed. Please try again.' };
  }
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Validate input
    if (!credentials.usn || !credentials.password) {
      return { success: false, message: 'USN and password are required' };
    }

    // Get user
    const user = getUserByUSN(credentials.usn.toUpperCase());
    if (!user) {
      return { success: false, message: 'Invalid USN or password' };
    }

    // Verify password
    const isValidPassword = await verifyPassword(credentials.password, user.password);
    if (!isValidPassword) {
      return { success: false, message: 'Invalid USN or password' };
    }

    // Set current user
    const userWithoutPassword = { 
      usn: user.usn, 
      email: user.email, 
      phone: user.phone, 
      createdAt: user.createdAt 
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { 
      success: true, 
      message: 'Login successful',
      user: userWithoutPassword
    };
  } catch (error) {
    return { success: false, message: 'Login failed. Please try again.' };
  }
}

export function getCurrentUser(): Omit<User, 'password'> | null {
  const userData = localStorage.getItem(CURRENT_USER_KEY);
  return userData ? JSON.parse(userData) : null;
}

export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}