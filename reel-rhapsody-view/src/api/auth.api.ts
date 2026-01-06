import axiosInstance from './axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// Register user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Get user profile
export const getUserProfile = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>('/users/profile');
  return response.data;
};

// Logout user (client-side only)
export const logoutUser = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
