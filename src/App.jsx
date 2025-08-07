import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Lazy imports using your correct paths
const Welcome = lazy(() => import("./Pages/OnBoardingScreens/Welcome"));
const Login = lazy(() => import("./Pages/OnBoardingScreens/Login"));
const OtpVerification = lazy(() =>
  import("./Pages/OnBoardingScreens/OtpVerification")
);

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
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpverification" element={<OtpVerification />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
