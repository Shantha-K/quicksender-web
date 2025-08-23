import React, { useState } from "react";
import logo from "../../assets/shifter.png";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Service/ApiService";
import * as yup from "yup";

const mobileSchema = yup.object({
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOtp = async () => {
    try {
      await mobileSchema.validate({ mobile });
      setError("");

      const response = await ApiService.post("/request-otp", { mobile });
      localStorage.setItem("otp", response.data.data.otp);
      localStorage.setItem("mobile", mobile);
      console.log("response", response.data);
      navigate("/otpverification");
    } catch (err) {
      if (err.name === "ValidationError") {
        setError(err.message);
      } else {
        console.error("Error requesting OTP:", err.message);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-between px-4 sm:px-8">
      <header className="flex justify-between items-center pt-2 pl-2">
        <img src={logo} alt="Shifter Logo" className="w-28 h-auto" />
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 mb-2">
           Let’s get you Login!
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
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 10-digit phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            onClick={handleOtp}
            className={`w-full py-2 font-semibold rounded-md transition ${
              mobile.length === 10
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            Request OTP
          </button>

          {/* <div className="flex justify-between text-sm text-green-600 font-medium mt-3">
            <a href="#" className="hover:underline">
              Forgot your phone number?
            </a>
            <a href="#" className="hover:underline">
              Need help logging in?
            </a>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default Login;
