import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";
import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaCreditCard,
  FaExclamationTriangle,
  FaBell,
} from "react-icons/fa";

const ProfileLayout = () => {
  const stats = [
    {
      title: "Account Status",
      value: "Verified",
      subText: "Your identity verification is complete.",
      icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
      valueClass: "text-green-500 font-bold text-lg",
    },
    {
      title: "Recent Parcels Sent",
      value: "3",
      subText: "Total parcels sent this month.",
      icon: <FaBox className="w-5 h-5 text-gray-500" />,
      valueClass: "font-bold text-lg",
    },
    {
      title: "Parcels Delivered",
      value: "18",
      subText: "Successfully delivered items this year.",
      icon: <FaTruck className="w-5 h-5 text-gray-500" />,
      valueClass: "font-bold text-lg",
    },
    {
      title: "Wallet Balance",
      value: "$125.50",
      subText: "Available balance in your wallet.",
      icon: <FaCreditCard className="w-5 h-5 text-gray-500" />,
      valueClass: "font-bold text-lg",
    },
    {
      title: "Outstanding Tasks",
      value: "1",
      subText: "KYC verification pending.",
      icon: <FaExclamationTriangle className="w-5 h-5 text-gray-500" />,
      valueClass: "font-bold text-lg",
    },
    {
      title: "New Notifications",
      value: "2",
      subText: "Unread messages and updates.",
      icon: <FaBell className="w-5 h-5 text-gray-500" />,
      valueClass: "font-bold text-lg",
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

export default ProfileLayout;
