import React from "react";

const OtpModal = ({
  isOpen,
  onClose,
  otp,
  handleChange,
  handleVerifyOtp,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="text-gray-600 mb-6">
          Please enter the 4-digit OTP sent to your phone.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-12 h-14 border text-center text-xl border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOtp}
          disabled={otp.join("").length !== 4 || loading}
          className={`w-full font-semibold py-2 rounded-md transition mb-3 ${
            otp.join("").length === 4 && !loading
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <button className="text-green-600 text-sm font-medium hover:underline">
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
