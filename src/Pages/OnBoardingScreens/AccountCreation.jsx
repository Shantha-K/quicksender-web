import logo from "../../assets/shifter.png";
import profileImage from "../../assets/profileimg.png";
import { FaCamera } from "react-icons/fa";
import { useEffect, useState } from "react";

const AccountCreation = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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

      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Verification Successful!
        </h1>
        <p className="text-gray-500 mt-2">
          Now, let's create your account to get started with{" "}
          <strong>ParcelTrack</strong>.
        </p>
      </div>

      {/* Profile Form */}
      <div className="max-w-2xl w-full mx-auto mt-4 bg-gray-50 p-6 rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="relative mt-[-2rem]">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md object-cover mt-2"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
              <FaCamera className="text-white text-sm" />
            </div>
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
    </div>
  );
};

export default AccountCreation;
