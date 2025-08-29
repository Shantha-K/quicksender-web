import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { LoadScript } from "@react-google-maps/api";

// Onboarding Screens
const Welcome = lazy(() => import("./Pages/OnBoardingScreens/Welcome"));
const Login = lazy(() => import("./Pages/OnBoardingScreens/Login"));
const OtpVerification = lazy(() =>
  import("./Pages/OnBoardingScreens/OtpVerification")
);
const AccountCreation = lazy(() =>
  import("./Pages/OnBoardingScreens/AccountCreation")
);
const DashBoard = lazy(() => import("./Pages/DashBoardScreens/DashBoard"));

// Profile Screens
const ProfileDashboard = lazy(() =>
  import("./Pages/ProfileScreens/ProfileDashboard")
);
const EditProfile = lazy(() => import("./Pages/ProfileScreens/EditProfile"));
const KycDetails = lazy(() => import("./Pages/ProfileScreens/KycDetails"));
const TermsConditions = lazy(() =>
  import("./Pages/ProfileScreens/TermsConditions")
);
const PrivacyPolicy = lazy(() =>
  import("./Pages/ProfileScreens/PrivacyPolicy")
);
const Mywallet = lazy(() => import("./Pages/ProfileScreens/Wallet/Mywallet"));
const Topup = lazy(() => import("./Pages/ProfileScreens/Wallet/Topup"));
const Withdraw = lazy(() => import("./Pages/ProfileScreens/Wallet/Withdraw"));

// Send Parcel Screens
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
const ParcelOrders = lazy(() =>
  import("./Pages/SendParcelScreens/ParcelOrders")
);
const ParcelSummary = lazy(() =>
  import("./Pages/SendParcelScreens/ParcelSummary")
);
const DeliveryPersons = lazy(() =>
  import("./Pages/SendParcelScreens/DeliveryPersons")
);
const CustomerReviews = lazy(() =>
  import("./Pages/SendParcelScreens/CustomerReviews")
);

// Delivery Partner Screens
const DeliveryPartner = lazy(() =>
  import("./Pages/DeliveryPartnerScreens/DeliveryPartner")
);
const DeliveryParcels = lazy(() =>
  import("./Pages/DeliveryPartnerScreens/DeliveryParcels")
);
const DeliveryParcelDetails = lazy(() =>
  import("./Pages/DeliveryPartnerScreens/DeliveryParcelDetails")
);

// calculator & Aboutus
const Calculator = lazy(() => import("./Pages/Calculator/Calculator"));
const AboutUs = lazy(() => import("./Pages/AboutUs/AboutUs"));

function App() {
  const libraries = ["places"];
  return (
    <Router>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Onboarding Screens */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otpverification" element={<OtpVerification />} />
            <Route path="/create-account" element={<AccountCreation />} />
            <Route path="/dashboard" element={<DashBoard />} />

            {/* Profile Section */}
            <Route path="/profile" element={<ProfileDashboard />} />
            <Route path="/profile/edit-profile" element={<EditProfile />} />
            <Route path="/profile/kyc-details" element={<KycDetails />} />
            <Route path="/profile/my-wallet" element={<Mywallet />} />
            <Route path="/profile/topup" element={<Topup />} />
            <Route path="/profile/withdraw" element={<Withdraw />} />
            <Route
              path="/profile/terms-conditions"
              element={<TermsConditions />}
            />
            <Route path="/profile/privacy-policy" element={<PrivacyPolicy />} />

            {/* Send Parcel Section */}
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
            <Route
              path="/send-parcel/parcel-orders"
              element={<ParcelOrders />}
            />
            <Route
              path="/send-parcel/parcel-summary/:parcelId"
              element={<ParcelSummary />}
            />
            <Route
              path="/send-parcel/delivery-persons/:parcelId"
              element={<DeliveryPersons />}
            />

            {/* Delivery Partner Section */}
            <Route path="/delivery-partner" element={<DeliveryPartner />} />
            <Route
              path="/delivery-partner/delivery-parcels"
              element={<DeliveryParcels />}
            />
            <Route
              path="/delivery-partner/delivery-parcel-details/:parcelId"
              element={<DeliveryParcelDetails />}
            />

            {/* Calculator Section */}
            <Route path="/calculator" element={<Calculator />} />

            {/* About Section */}
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </Suspense>
      </LoadScript>
    </Router>
  );
}

export default App;
