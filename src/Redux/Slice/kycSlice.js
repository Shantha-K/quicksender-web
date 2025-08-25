import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../Service/ApiService";

export const fetchKycStatus = createAsyncThunk(
  "kyc/fetchKycStatus",
  async (_, { rejectWithValue }) => {
    try {
      // const jwtToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE5ZDRkODQ0OTI4ZjJiNGY5YjcyZjAiLCJtb2JpbGUiOiI3NDA0NTcxMDI1IiwiaWF0IjoxNzU1OTYwNTQ3LCJleHAiOjE3NTY1NjUzNDd9.FhcHExdSwjsD6v824aCS54vozujWOqEpIfBb_I9QBBE";
      const token = localStorage.getItem("token");
      // if (!token) throw new Error("No auth token found");
      const response = await ApiService.get("/kyc-status", null, token);
      console.log("Fetched KYC status:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    status: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKycStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKycStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.kycStatus;
      })
      .addCase(fetchKycStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default kycSlice.reducer;
