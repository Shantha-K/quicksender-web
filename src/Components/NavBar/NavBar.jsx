import { useEffect, useState } from "react";
import logo from "../../assets/shifter.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  return (
    <header
      className="flex items-center justify-between px-6 py-2"
      style={{ backgroundColor: "#00C27C" }}
    >
      <div className="flex items-center gap-4">
        <img src={logo} alt="Shifter Logo" className="h-16 w-auto" />
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-white">
        <Link to="/parcel" className="hover:text-gray-200">
          Parcel
        </Link>
        <Link to="/send-parcel" className="hover:text-gray-200">
          Sender
        </Link>
        <Link to="/partner" className="hover:text-gray-200">
          Partner
        </Link>
        <Link to="/calculator" className="hover:text-gray-200">
          Calculator
        </Link>
        <Link to="/about-us" className="hover:text-gray-200">
          About us
        </Link>
      </nav>
      <div
        className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm gap-2 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <button className="text-green-700 text-sm font-medium hover:underline">
          Profile
        </button>
      </div>
    </header>
  );
};

export default NavBar;
