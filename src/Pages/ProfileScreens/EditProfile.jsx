import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";
import ApiService from "../../Service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisteredUser } from "../../Redux/Slice/userSlice";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_REACT_APP_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    profileImage: null, // file object
  });

  const [preview, setPreview] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    dispatch(fetchRegisteredUser());
  }, [dispatch]);

  // When user data arrives, populate form and preview
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        dob: user.dob || "",
        address: user.address || "",
        profileImage: null,
      });
      setPreview(user.profileImage ? `${API_URL}/${user.profileImage}` : null);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("No user ID found");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("dob", form.dob);
      formData.append("address", form.address);
      if (form.profileImage) {
        formData.append("profileImage", form.profileImage);
      }

      const token = localStorage.getItem("token");

      const response = await ApiService.put(
        `/editprofile/${userId}`,
        formData,
        token
      );

      if (response.data.success) {
        alert("Profile updated successfully!");
        dispatch(fetchRegisteredUser()); // refresh user data in redux
      } else {
        alert("Update failed, please try again.");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };

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
          <div className="mx-auto p-8 rounded-xl shadow ">
            <h1 className="text-2xl font-bold text-center mb-6">
              Edit Profile
            </h1>

            <div className="flex justify-center mb-4">
              <img
                src={preview || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    name="dob"
                    placeholder="DD/MM/YYYY"
                    value={form.dob}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
