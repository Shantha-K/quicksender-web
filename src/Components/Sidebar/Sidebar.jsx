import { useState, useEffect } from "react";
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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRegisteredUser } from "../../Redux/Slice/userSlice";

const ResponsiveSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const IMG_URL = import.meta.env.VITE_REACT_IMAGE_URL;

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    dispatch(fetchRegisteredUser());
  }, [dispatch]);

  return (
    <div className="flex">
      {/* ==== HAMBURGER (MOBILE ONLY) ==== */}
      <div className="w-full md:hidden bg-white shadow p-3 flex justify-between items-center">
        <button
          className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg  text-white shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* {isOpen ? "✖" : "☰"} */}
        </button>
      </div>

      {/* ==== SIDEBAR ==== */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-72 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{
          backgroundImage: "linear-gradient(to bottom, #09F8A0, #00C680)",
        }}
      >
        <div className="h-full flex flex-col justify-between py-6 px-4">
          {/* Menu Items */}
          <div className="space-y-5 mb-2">
            <SidebarItem
              icon={<MdDashboard />}
              text="Dashboard Overview"
              onClick={() => {
                navigate("/profile");
                closeSidebar();
              }}
            />
            <SidebarItem
              icon={<FaUserEdit />}
              text="Edit profile"
              onClick={() => {
                navigate("/profile/edit-profile");
                closeSidebar();
              }}
            />
            <SidebarItem
              icon={<FaClipboardList />}
              text="KYC Details"
              onClick={() => {
                navigate("/profile/kyc-details");
                closeSidebar();
              }}
            />
            <SidebarItem
              icon={<FaBell />}
              text="Notifications"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={<FaBox />}
              text="Sent Parcels"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={<FaTruck />}
              text="Delivered Parcels"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={<FaWallet />}
              text="My Wallet"
              onClick={() => {
                navigate("/profile/my-wallet");
                closeSidebar();
              }}
            />
            <SidebarItem
              icon={<FaLock />}
              text="Privacy Policy"
              onClick={() => {
                navigate("/profile/privacy-policy");
                closeSidebar();
              }}
            />
            <SidebarItem
              icon={<FaLock />}
              text="Terms & Conditions"
              onClick={() => {
                navigate("/profile/terms-conditions");
                closeSidebar();
              }}
            />
          </div>

          {/* Profile + Logout */}
          <div className="space-y-5">
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
              </div>
              <h3 className="font-semibold text-xl">
                {user?.name || "User Name"}
              </h3>
              <p className="text-[#565D6D] text-sm opacity-80">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/");
                closeSidebar();
              }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 w-full justify-center py-2 rounded-md text-white"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}
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

export default ResponsiveSidebar;
