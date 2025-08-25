import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../Service/ApiService";

export const fetchParcelById = createAsyncThunk(
  "parcel/fetchParcelById",
  async (parcelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await ApiService.get(
        `/delivery/request/${parcelId}`,
        {},
        token
      );
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch parcel");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const parcelSlice = createSlice({
  name: "parcel",
  initialState: {
    currentParcel: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParcelById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentParcel = action.payload;
      })
      .addCase(fetchParcelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch parcel";
      });
  },
});

export default parcelSlice.reducer;
