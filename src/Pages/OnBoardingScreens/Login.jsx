import React from "react";
import logo from "../../assets/shifter.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleOtp = () => {
    navigate("/otpverification");
  };
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-between px-4 sm:px-8 ">
      {/* Header */}
      <header className="flex justify-between items-center pt-2 pl-2">
        <img src={logo} alt="Shifter Logo" className="w-28 h-auto" />
      </header>

      {/* Center Form */}
      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 mb-2">
            Welcome to ParcelTrack!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your phone number to continue your journey.
          </p>

          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="e.g., +1 234 567 8900"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />

          <button
            onClick={handleOtp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md mb-3 transition"
          >
            Request OTP
          </button>

          <div className="flex justify-between text-sm text-green-600 font-medium">
            <a href="#" className="hover:underline">
              Forgot your phone number?
            </a>
            <a href="#" className="hover:underline">
              Need help logging in?
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
