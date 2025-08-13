import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";
import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaCreditCard,
  FaExclamationTriangle,
  FaBell,
  FaSpinner,
  FaTimesCircle,
  FaHourglassHalf,
  FaExclamationCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchKycStatus } from "../../Redux/Slice/kycSlice";
import { fetchmyWallet } from "../../Redux/Slice/MyWalletSlice";

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, loading, error } = useSelector((state) => state.kyc);
  const { balance } = useSelector((state) => state.myWallet);

  useEffect(() => {
    dispatch(fetchKycStatus());
    dispatch(fetchmyWallet());
  }, [dispatch]);

  const getStatusDetails = () => {
    if (loading) {
      return {
        value: "Loading...",
        subText: "Fetching your KYC status...",
        icon: <FaSpinner className="w-5 h-5 text-blue-500 animate-spin" />,
        valueClass: "text-blue-500 font-bold text-lg",
      };
    }

    if (error) {
      return {
        value: "Error",
        subText: "Failed to fetch KYC status.",
        icon: <FaTimesCircle className="w-5 h-5 text-red-500" />,
        valueClass: "text-red-500 font-bold text-lg",
      };
    }

    if (status === "verified") {
      return {
        value: "Verified",
        subText: "Your identity verification is complete.",
        icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
        valueClass: "text-green-500 font-bold text-lg",
      };
    }

    if (status === "pending") {
      return {
        value: "Pending",
        subText: "Your KYC verification is in progress.",
        icon: <FaHourglassHalf className="w-5 h-5 text-yellow-500" />,
        valueClass: "text-yellow-500 font-bold text-lg",
      };
    }

    return {
      value: "Not Verified",
      subText: "Please complete your KYC verification.",
      icon: <FaExclamationCircle className="w-5 h-5 text-red-500" />,
      valueClass: "text-gray-500 font-bold text-lg",
    };
  };

  const stats = [
    {
      title: "Account Status",
      ...getStatusDetails(),
    },
    {
      title: "Wallet Balance",
      value: `$${balance.toFixed(2)}`,
      subText: "Your current wallet balance.",
      icon: <FaCreditCard className="w-5 h-5 text-green-500" />,
      valueClass: "text-green-500 font-bold text-lg",
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="h-full">
          <SideBar />
        </div>

        {/* Main Content */}
        <div
          className="flex-1 p-8 overflow-auto"
          style={{ backgroundColor: "#F2FCF8" }}
        >
          <h1 className="text-2xl font-bold mb-1">Dashboard Overview</h1>
          <p className="text-gray-600 mb-6">
            Welcome back! Here's a quick summary of your Shifter Profile
            activities.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium text-gray-500">
                    {item.title}
                  </h2>
                  {item.icon}
                </div>
                <p className={item.valueClass}>{item.value}</p>
                <p className="text-sm text-gray-500">{item.subText}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
