import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
};

// Function to get the token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Add the token to the headers for each request
const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-d1.onrender.com/api/admin/orders',
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axiosInstance.get(`/get`);
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axiosInstance.get(`/details/${id}`);
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axiosInstance.put(`/update/${id}`, { orderStatus });
    return response.data;
  }
);

export const updateTrackingStatus = createAsyncThunk(
  "/order/updateTrackingStatus",
  async ({ id, trackingStatus }) => {
    const response = await axiosInstance.put(`/updateTracking/${id}`, { trackingStatus });
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(updateTrackingStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrackingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, trackingStatus } = action.payload.data;
        if (state.orderDetails && state.orderDetails._id === id) {
          state.orderDetails.trackingStatus = trackingStatus;
        }
      })
      .addCase(updateTrackingStatus.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to update tracking status";
      });
  },
});

//for total orders
export const selectTotalOrders = (state) => state.adminOrder.orderList.length;

//for delivered count
export const selectDeliveredOrders = (state) => {
  return state.adminOrder.orderList.filter(order => order.trackingStatus === 'delivered').length;
};

//for pending order
export const selectPendingOrders = (state) => {
  return state.adminOrder.orderList.filter(order => 
    order.trackingStatus !== 'delivered'
  ).length;
};


export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
