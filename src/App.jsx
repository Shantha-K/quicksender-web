import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Lazy imports using your correct paths
const Welcome = lazy(() => import("./Pages/OnBoardingScreens/Welcome"));
const Login = lazy(() => import("./Pages/OnBoardingScreens/Login"));
const OtpVerification = lazy(() =>
  import("./Pages/OnBoardingScreens/OtpVerification")
);
const AccountCreation = lazy(() =>
  import("./Pages/OnBoardingScreens/AccountCreation")
);
const DashBoard = lazy(() => import("./Pages/DashBoardScreens/DashBoard"));
const Profile = lazy(() => import("./Pages/ProfileScreens/Profile"));
const SendParcel = lazy(() => import("./Pages/SendParcelScreens/SendParcel"));
const SenderDetails = lazy(() =>
  import("./Pages/SendParcelScreens/SenderDetails")
);
const ReceiverDetails = lazy(() =>
  import("./Pages/SendParcelScreens/ReceiverDetails")
);
const ParcelDetails = lazy(() =>
  import("./Pages/SendParcelScreens/ParcelDetails")
);
const Summary = lazy(() => import("./Pages/SendParcelScreens/Summary"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpverification" element={<OtpVerification />} />
          <Route path="/create-account" element={<AccountCreation />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />

          {/* Send Parcel steps */}
          <Route path="/send-parcel" element={<SendParcel />} />
          <Route
            path="/send-parcel/sender-details"
            element={<SenderDetails />}
          />
          <Route
            path="/send-parcel/receiver-details"
            element={<ReceiverDetails />}
          />
          <Route
            path="/send-parcel/parcel-details"
            element={<ParcelDetails />}
          />
          <Route path="/send-parcel/review" element={<Summary />} />

          {/* Fallback route */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
