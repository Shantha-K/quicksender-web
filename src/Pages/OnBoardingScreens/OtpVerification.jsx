import { useEffect, useState } from "react";
import otplogo from "../../assets/otplogo.png";
import logo from "../../assets/shifter.png";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Service/ApiService";
import Model from "../../Components/Model/Model";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(60); // countdown (60s)

  const mobile = localStorage.getItem("mobile");

  // handle otp input
  const handleChange = (value, index) => {
    if (!/^[0-9]{0,1}$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) return;

    try {
      const response = await ApiService.post("/verify-otp", {
        mobile,
        otp: enteredOtp,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("mobile", response.data.data.mobile);
        localStorage.removeItem("otp");

        if (response.data.existed === false) {
          navigate("/create-account");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      setError("Invalid or expired OTP");
    }
  };

  // resend OTP
  // const handleResendOtp = async () => {
  //   if (timer === 0) {
  //     try {
  //       await ApiService.post("/resend-otp", { mobile }); // call your API
  //       console.log("Resent OTP");
  //       setTimer(60); // restart timer
  //     } catch (err) {
  //       console.error("Resend failed:", err);
  //     }
  //   }
  // };

  // countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
          <p className="text-gray-600 mb-4">
            An OTP has been sent to your registered mobile number.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength="1"
                autoComplete="one-time-code"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                    document.getElementById(`otp-${idx - 1}`).focus();
                  }
                }}
                className="w-12 h-14 border text-center text-xl border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-2">
            Sent OTP:{" "}
            <span className="font-bold">{localStorage.getItem("otp")}</span>
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Verify OTP */}
          <button
            onClick={handleVerifyOtp}
            disabled={otp.join("").length !== 4}
            className={`w-full font-semibold py-2 rounded-md transition mb-3 ${
              otp.join("").length === 4
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Verify OTP
          </button>

          {/* Resend OTP */}
          <button
            disabled={timer > 0}
            className={`text-sm font-medium ${
              timer > 0
                ? "text-gray-500 cursor-not-allowed"
                : "text-green-600 hover:underline"
            }`}
          >
            {timer > 0 ? (
              <>
                Resend OTP in{" "}
                <span className="text-green-600 font-semibold">{timer}s</span>
              </>
            ) : (
              "Resend OTP"
            )}
          </button>
        </div>
      </main>

      {/* Success Modal */}
      {showModal && (
        <Model
          isOpen={showModal}
          title="OTP Verified!"
          message="Your OTP has been successfully verified."
          buttonText="Done"
          onClose={() =>
            response.data.existed === false
              ? navigate("/create-account")
              : navigate("/dashboard")
          }
        />
      )}
    </div>
  );
};

export default OTPVerification;
