import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";
import ApiService from "../../Service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisteredUser } from "../../Redux/Slice/userSlice";
import Model from "../../Components/Model/Model";

const EditProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const IMG_URL = import.meta.env.VITE_REACT_IMAGE_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);

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
      setPreview(`${IMG_URL}/${user.profileImage || "default.jpg"}`);
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
      const token = localStorage.getItem("token");
      if (!userId || !token) throw new Error("User ID or token missing");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("dob", form.dob);
      formData.append("address", form.address);

      // Append image ONLY if it's a File (not a string URL)
      if (form.profileImage instanceof File) {
        formData.append("profileImage", form.profileImage);
      }

      const response = await ApiService.putFormData(
        `/editprofile/${userId}`,
        formData,
        token
      );

      if (response.data.success) {
        setShowModal(true);
        dispatch(fetchRegisteredUser()).then((action) => {
          if (action.payload?.profileImage) {
            // Force reload new image
            setPreview(
              `${IMG_URL}/${action.payload.profileImage}?t=${Date.now()}`
            );
          }
        });
      } else {
        alert("Update failed, please try again.");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    dispatch(fetchRegisteredUser());
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div
          className="flex-1 p-8 overflow-auto"
          style={{ backgroundColor: "#F2FCF8" }}
        >
          <div className="mx-auto p-8 rounded-xl shadow">
            <h1 className="text-2xl font-bold text-center mb-4">
              Edit Profile
            </h1>

            <div className="flex justify-center mb-4">
              <img
                src={preview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium">Name</label>
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
                  <label className="block text-sm font-medium">Email</label>
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
                  <label className="block text-sm font-medium">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
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
                <label className="block text-sm font-medium">Address</label>
                <textarea
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Profile Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-40 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>

        {showModal && (
          <Model
            isOpen={showModal}
            title="Profile updated successfully!"
            message="Your profile has been updated."
            buttonText="Done"
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
