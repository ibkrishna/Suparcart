import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

// Function to get the token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Create an Axios instance with an interceptor to add the token
const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-d1.onrender.com/api/shop/order', // Base URL for your order API
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/create", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axiosInstance.post("/capture", {
      paymentId,
      payerId,
      orderId,
    });
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axiosInstance.get(`/list/${userId}`);
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id) => {
    const response = await axiosInstance.get(`/details/${id}`);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
        console.error("Error fetching order details:", action.payload);
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
