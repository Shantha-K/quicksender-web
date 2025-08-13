import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../Service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchmyWallet } from "../../Redux/Slice/MyWalletSlice";
import { useEffect, useState } from "react";
import Model from "../../Components/Model/Model";
import OtpModal from "../../Components/Model/OtpModal";

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { sender, receiver, parcel } = location.state || {};
  const { balance } = useSelector((state) => state.myWallet);

  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchmyWallet());
  }, [dispatch]);

  const payment = {
    paymentType: "Wallet",
    deliveryFee: "$30",
  };

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const Card = ({ title, children }) => (
    <div className="bg-[#C9FFDD] p-5 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="space-y-1 text-gray-800">{children}</div>
    </div>
  );

  // Step 1: Start payment
  const requestPaymentOtp = async (e) => {
    e.preventDefault();

    // Check balance
    if (balance < parcel?.amount) {
      setShowModal(true);
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      setLoading(true);
      const otpResponse = await ApiService.post("wallet/request-otp", {
        userId,
      });

      if (otpResponse.data.success) {
        setShowOtpModal(true);
      } else {
        alert("Failed to request OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      alert("An error occurred while requesting OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) return;

    const userId = localStorage.getItem("userId");
    const payload = { userId, otp: enteredOtp };
    try {
      setLoading(true);
      const verifyResponse = await ApiService.post(
        "wallet/verify-otp",
        payload
      );
      if (!verifyResponse.data?.success) {
        alert(verifyResponse.data?.message || "OTP verification failed");
        return;
      }
      // Step 3: Make delivery request
      const token = localStorage.getItem("token");
      await makeDeliveryRequest(token);
      setShowOtpModal(false);
      setOtp(["", "", "", ""]);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Make delivery request
  const makeDeliveryRequest = async (token) => {
    if (!token) {
      alert("User is not logged in.");
      return;
    }
    const payload = {
      sender: {
        name: sender?.name,
        email: sender?.email,
        phone: sender?.phone,
        address: sender?.address,
        state: sender?.state,
        city: sender?.city,
      },
      receiver: {
        name: receiver?.name,
        email: receiver?.email,
        phone: receiver?.phone,
        address: receiver?.address,
        state: receiver?.state,
        city: receiver?.city,
      },
      parcel: {
        productName: parcel?.category,
        weight: `${parcel?.weight} kg`,
        length: `${parcel?.length} cm`,
        width: `${parcel?.width} cm`,
        height: `${parcel?.height} cm`,
        estimatedAmount: parcel?.amount,
      },
      payment: {
        paymentType: payment.paymentType,
        deliveryFee: payment.deliveryFee,
      },
    };
    try {
      const deliveryResponse = await ApiService.post(
        "delivery/request",
        payload,
        token
      );
      if (deliveryResponse.data?.success) {
        alert("Payment & delivery request submitted successfully!");
      } else {
        console.error("Delivery request failed:", error);
        alert("An error occurred while processing your request");
      }
    } catch (error) {
      console.error("Delivery request failed:", error);
      alert("An error occurred while processing your request");
    }
  };

  return (
    <div>
      <NavBar />

      <div className="p-6 flex flex-wrap gap-6 justify-center">
        <Card title="Sender">
          <p>{sender?.name}</p>
          <p>{sender?.email}</p>
          <p>{sender?.phone}</p>
          <p>{sender?.address}</p>
        </Card>

        <Card title="Receiver">
          <p>{receiver?.name}</p>
          <p>{receiver?.email}</p>
          <p>{receiver?.phone}</p>
          <p>{receiver?.address}</p>
        </Card>

        <Card title="Parcel">
          <p>{parcel.category}</p>
          <p>
            {parcel.weight} kg Weight, {parcel.length} cm Length, {parcel.width}{" "}
            cm Width, {parcel.height} cm Height
          </p>
        </Card>

        <Card title="Parcel Estimated Amount">
          <p>${parcel.amount}</p>
        </Card>

        <Card title="Payment">
          <p>Payment Type : {payment.paymentType}</p>
          <p>Delivery Fee : {payment.deliveryFee}</p>
        </Card>
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={requestPaymentOtp}
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition w-48"
        >
          {loading ? "Processing..." : `Pay $${parcel?.amount}`}
        </button>
      </div>
      <Footer />
      {/* Low Balance Modal */}
      {showModal && (
        <Model
          isOpen={showModal}
          title="Your wallet balance is very low"
          message="Add required money to your wallet in order to send parcel"
          buttonText="Add Money"
          onClose={() => navigate("/profile/topup")}
        />
      )}

      {/* OTP Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        otp={otp}
        handleChange={handleChange}
        handleVerifyOtp={handleVerifyOtp}
        loading={loading}
      />
    </div>
  );
};

export default Summary;

//  const handlePayment = async (e) => {
//     e.preventDefault();

//     // Check balance
//     if (balance < parcel?.amount) {
//       setShowModal(true);
//       return;
//     }
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("User is not logged in.");
//       return;
//     }
//     try {
//       const payload = {
//         sender: {
//           name: sender?.name,
//           email: sender?.email,
//           phone: sender?.phone,
//           address: sender?.address,
//           state: sender?.state,
//           city: sender?.city,
//         },
//         receiver: {
//           name: receiver?.name,
//           email: receiver?.email,
//           phone: receiver?.phone,
//           address: receiver?.address,
//           state: receiver?.state,
//           city: receiver?.city,
//         },
//         parcel: {
//           productName: parcel?.category,
//           weight: `${parcel?.weight} kg`,
//           length: `${parcel?.length} cm`,
//           width: `${parcel?.width} cm`,
//           height: `${parcel?.height} cm`,
//           estimatedAmount: parcel?.amount,
//         },
//         payment: {
//           paymentType: payment.paymentType,
//           deliveryFee: payment.deliveryFee,
//         },
//       };
//       const response = await ApiService.post(
//         "/delivery/request",
//         payload,
//         token
//       );
//       if (response.data?.success) {
//         console.log("Delivery request successful:", response.data);
//         alert("Payment & delivery request submitted successfully!");
//       } else {
//         console.error("Delivery request failed:", response.data?.message);
//         alert(response.data?.message || "Payment failed");
//       }
//     } catch (error) {
//       console.error("Payment processing failed:", error);
//       alert("An error occurred while processing your request");
//     }
//   };
