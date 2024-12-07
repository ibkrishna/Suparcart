import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null, // For error handling
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce-d1.onrender.com/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce-d1.onrender.com/api/auth/login",
        formData,
        { withCredentials: true }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verify-otp",
  async ({ mobileNumber, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce-d1.onrender.com/api/auth/verify-otp",
        { mobileNumber, otp },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Request OTP
export const requestOTP = createAsyncThunk(
  "auth/request-otp",
  async (mobileNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce-d1.onrender.com/api/auth/request-otp",
        { mobileNumber },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce-d1.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Check auth
export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.get(
        "https://ecommerce-d1.onrender.com/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    loadUserFromLocalStorage: (state) => {
      const token = localStorage.getItem('token');
      state.isAuthenticated = !!token; // Set as authenticated if token exists
      state.isLoading = false; // Loading complete
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Assuming the server returns user details
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("login User state", action.payload);
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          localStorage.setItem('token', action.payload.token);
          console.log("Token Stored", localStorage.getItem('token'))
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      });
  },
});

export const { setUser, loadUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
