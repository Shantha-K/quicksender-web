import {
  FaUserEdit,
  FaClipboardList,
  FaBell,
  FaBox,
  FaTruck,
  FaWallet,
  FaLock,
  FaSignOutAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, fetchRegisteredUser } from "../../Redux/Slice/userSlice";
import { useEffect } from "react";
import { MdDashboard } from "react-icons/md";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const IMG_URL = import.meta.env.VITE_REACT_IMAGE_URL;

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/"); // Redirect to the welcome page
  };

  useEffect(() => {
    dispatch(fetchRegisteredUser());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="w-72 h-full  flex flex-col justify-between py-6 px-4"
      style={{
        backgroundImage: "linear-gradient(to bottom, #09F8A0, #00C680)",
      }}
    >
      {/* Menu Items */}
      <div className="space-y-5 mb-2">
        <SidebarItem
          icon={<MdDashboard />}
          text="Dashboard Overview"
          onClick={() => navigate("/profile")}
        />
        <SidebarItem
          icon={<FaUserEdit />}
          text="Edit profile"
          onClick={() => navigate("/profile/edit-profile")}
        />
        <SidebarItem
          icon={<FaClipboardList />}
          text="KYC Details"
          onClick={() => navigate("/profile/kyc-details")}
        />
        <SidebarItem icon={<FaBell />} text="Notifications" />
        <SidebarItem icon={<FaBox />} text="Sent Parcels" />
        <SidebarItem icon={<FaTruck />} text="Delivered Parcels" />
        <SidebarItem
          icon={<FaWallet />}
          text="My Wallet"
          onClick={() => navigate("/profile/my-wallet")}
        />
        <SidebarItem
          icon={<FaLock />}
          text="Privacy Policy"
          onClick={() => navigate("/profile/privacy-policy")}
        />
        <SidebarItem
          icon={<FaLock />}
          text="Terms & Conditions"
          onClick={() => navigate("/profile/terms-conditions")}
        />
      </div>

      {/* Logout + Profile */}
      <div className="space-y-5">
        {/* Profile card */}
        <div className="bg-white/20 rounded-xl text-center py-4 px-2 relative">
          <div className="relative w-20 h-20 mx-auto mb-2">
            <img
              src={
                user?.profileImage
                  ? `${IMG_URL}/${user.profileImage}`
                  : "fallback-image.jpg"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
            <div className="absolute bottom-1 right-1 bg-green-500 p-1 rounded-full">
              <FaUserEdit className="text-white text-xs" />
            </div>
          </div>
          <h3 className="font-semibold text-xl">{user?.name || "User Name"}</h3>
          <p className="text-[#565D6D]  text-sm opacity-80">
            {user?.email || "user@example.com"}
          </p>
        </div>
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 w-full justify-center py-2 rounded-md text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, badge, warning, dot, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 text-[#565D6D] relative cursor-pointer hover:text-white transition-colors duration-200"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-md">{text}</span>
    {badge && (
      <span className="absolute right-0 flex items-center gap-1">
        <span className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
        {warning && (
          <FaExclamationTriangle className="text-yellow-300 text-sm" />
        )}
      </span>
    )}
    {dot && (
      <span className="absolute right-2 top-2 w-2 h-2 bg-red-500 rounded-full" />
    )}
  </div>
);

export default SideBar;
