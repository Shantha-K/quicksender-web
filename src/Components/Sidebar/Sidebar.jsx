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
// import { IoDocumentText } from "react-icons/io5";

const SideBar = () => {
  return (
    <div
      className="w-72 h-full  flex flex-col justify-between py-6 px-4"
      style={{
        backgroundImage: "linear-gradient(to bottom, #09F8A0, #00C680)",
      }}
    >
      {/* Menu Items */}
      <div className="space-y-6">
        <SidebarItem icon={<FaUserEdit />} text="Edit profile" />
        <SidebarItem icon={<FaClipboardList />} text="KYC Details" />
        <SidebarItem icon={<FaBell />} text="Notifications" />
        <SidebarItem icon={<FaBox />} text="Sent Parcels" />
        <SidebarItem icon={<FaTruck />} text="Delivered Parcels" />
        <SidebarItem icon={<FaWallet />} text="My Wallet" />
        <SidebarItem icon={<FaLock />} text="Privacy Policy" />
        <SidebarItem icon={<FaLock />} text="Terms & Conditions" />
      </div>

      {/* Logout + Profile */}
      <div className="space-y-6">
        {/* Profile card */}
        <div className="bg-white/20 rounded-xl text-center py-4 px-2 relative">
          <div className="relative w-20 h-20 mx-auto mb-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-white"
            />
            <div className="absolute bottom-1 right-1 bg-green-500 p-1 rounded-full">
              <FaUserEdit className="text-white text-xs" />
            </div>
          </div>
          <h3 className="font-semibold text-xl">Johnson Smith</h3>
          <p className="text-[#565D6D]  text-sm opacity-80">
            johnson@gmail.com
          </p>
        </div>
        {/* Logout button */}
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 w-full justify-center py-2 rounded-md text-white">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, badge, warning, dot }) => (
  <div className="flex items-center gap-3 text-[#565D6D] relative">
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
