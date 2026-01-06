import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from '@/api/auth.api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface DecodedToken {
  id: string;
  exp: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  error: string | null;
}

// Check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Get initial state from localStorage
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (token && userStr && !isTokenExpired(token)) {
    try {
      const user = JSON.parse(userStr) as User;
      return {
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: user.role === 'admin',
        error: null,
      };
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
  
  return {
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    isAdmin: false,
    error: null,
  };
};

// Async thunks
export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      // Store token and user in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      }));
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk<AuthResponse, RegisterData, { rejectValue: string }>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      // Store token and user in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role,
      }));
      return response;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(err.response?.data?.message || err.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      logoutUser();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        _id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
      };
      state.isAdmin = action.payload.role === 'admin';
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Login failed';
    });

    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        _id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
      };
      state.isAdmin = action.payload.role === 'admin';
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Registration failed';
    });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
