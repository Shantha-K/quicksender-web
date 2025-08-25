import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slice/userSlice";
import kycReducer from "../Slice/kycSlice";
import myWalletReducer from "../Slice/MyWalletSlice";
import parcelReducer from "../Slice/parcelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    kyc: kycReducer,
    myWallet: myWalletReducer,
    parcel: parcelReducer,
  },
});
