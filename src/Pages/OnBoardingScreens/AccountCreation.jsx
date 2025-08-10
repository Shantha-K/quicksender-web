import logo from "../../assets/shifter.png";
import profileImage from "../../assets/profileimg.png";
import { FaCamera } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Model from "../../Components/Model/Model";
import axios from "axios";

const AccountCreation = () => {
  const API_URL = import.meta.env.VITE_REACT_APP_URL;

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    profileImage: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prevForm) => ({ ...prevForm, profileImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        // localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("dob", form.dob);
      formData.append("address", form.address);
      if (form.profileImage) {
        formData.append("profileImage", form.profileImage);
      }

      const response = await axios.post(`${API_URL}/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.data._id);
        setShowModal(true);
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Upload error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const savedMobile = localStorage.getItem("mobile");
    if (savedMobile) {
      setForm((prevForm) => ({ ...prevForm, mobile: savedMobile }));
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col px-4 sm:px-8">
      {/* Header */}
      <header className="flex justify-between items-center pt-2 pl-2">
        <img src={logo} alt="Shifter Logo" className="w-28 h-auto" />
      </header>

      {/* Profile Form */}
      <div className="max-w-2xl w-full mx-auto mt-4 bg-gray-50 p-8 rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="relative mt-[-2rem]">
            {/* Profile Image Preview */}
            <img
              src={preview || profileImage} // fallback if preview not selected
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md object-cover mt-2"
            />

            {/* Camera Icon Button (click triggers file input) */}
            <div
              className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <FaCamera className="text-white text-sm" />
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-700">
            Complete Your Profile
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your phone number"
              disabled // prevent changing mobile
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your address"
            />
          </div>

          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-all"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      {/* Modal for successful account creation */}
      {showModal && (
        <Model
          isOpen={showModal}
          title="Account created successfully!"
          message="Your account created successfully."
          buttonText="Done"
          onClose={() => navigate("/dashboard")}
        />
      )}
    </div>
  );
};

export default AccountCreation;
