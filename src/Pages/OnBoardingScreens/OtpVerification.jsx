import otplogo from "../../assets/otplogo.png";
import logo from "../../assets/shifter.png";

const OTPVerification = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-between px-4 sm:px-8">
      {/* Header */}
      <header className="flex justify-between items-center pt-2 pl-2">
        <img src={logo} alt="Shifter Logo" className="w-28 h-auto" />
      </header>

      {/* Center OTP Box */}
      <main className="flex-grow flex justify-center items-start pt-8">
        <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-sm border text-center">
          <img
            src={otplogo}
            alt="OTP Illustration"
            className="w-40 h-32 mx-auto mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Enter OTP
          </h2>
          <p className="text-gray-600 mb-6">
            An OTP has been sent to your registered mobile number.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 mb-6">
            {Array(6)
              .fill(0)
              .map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md mb-3 transition">
            Verify OTP
          </button>

          <button className="text-green-600 text-sm font-medium hover:underline">
            Resend OTP
          </button>
        </div>
      </main>
    </div>
  );
};

export default OTPVerification;
