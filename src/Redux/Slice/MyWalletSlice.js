import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../Service/ApiService";

export const fetchmyWallet = createAsyncThunk(
  "myWallet/fetchmyWallet",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId) throw new Error("No user ID found");
      const response = await ApiService.get(`/wallet/${userId}`, {}, token);
      console.log("Fetched wallet data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const myWalletSlice = createSlice({
  name: "myWallet",
  initialState: {
    balance: 0,
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchmyWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchmyWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance ?? 0;
        state.transactions = action.payload.transactions ?? [];
      })
      .addCase(fetchmyWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load wallet";
      });
  },
});

export default myWalletSlice.reducer;
