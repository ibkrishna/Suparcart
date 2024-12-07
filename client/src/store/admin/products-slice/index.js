import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// Add New Product
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async ({ formData, adminId }) => {
    const result = await axios.post(
      "https://ecommerce-d1.onrender.com/api/admin/products/add",
      { ...formData, adminId }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Fetch All Products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (adminId) => {
    const result = await axios.get(
      `https://ecommerce-d1.onrender.com/api/admin/products/get/${adminId}`
    );
    return result?.data;
  }
);

// Edit Product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData, adminId }) => {
    const result = await axios.put(
      `https://ecommerce-d1.onrender.com/api/admin/products/edit/${id}`,
      { ...formData, adminId }, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async ({ id, adminId }) => {
    const result = await axios.delete(
      `https://ecommerce-d1.onrender.com/api/admin/products/delete/${id}`,
      { data: { adminId } }
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
