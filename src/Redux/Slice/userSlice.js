import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../Service/ApiService";

export const fetchRegisteredUser = createAsyncThunk(
  "user/fetchRegisteredUser",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("No user ID found");

      const response = await ApiService.get(`/getregistered/${userId}`);
      console.log("Fetched user data:", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegisteredUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchRegisteredUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null; // Clear if fetch failed
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
