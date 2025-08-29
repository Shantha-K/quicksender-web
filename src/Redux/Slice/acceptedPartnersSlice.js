import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../Service/ApiService";

export const fetchAcceptedPartners = createAsyncThunk(
  "partners/fetchAcceptedPartners",
  async (parcelId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await ApiService.get(
        `/delivery/accepted-partners/${parcelId}`,
        {},
        token
      );

      if (response.data.success) {
        // console.log("accepted-partners:", response.data);
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch accepted partners");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const acceptedPartnersSlice = createSlice({
  name: "acceptedPartners",
  initialState: {
    partners: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcceptedPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcceptedPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(fetchAcceptedPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accepted partners";
      });
  },
});

export default acceptedPartnersSlice.reducer;
