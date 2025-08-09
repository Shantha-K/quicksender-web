import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";

const ParcelDetails = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const sender = location.state?.sender;
  const receiver = location.state?.receiver;

  const [formData, setFormData] = useState({
    category: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    navigate("/send-parcel/review", {
      state: {
        sender,
        receiver,
        parcel: formData,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-1 w-full px-4 py-8">
        {/* Stepper */}
        <div className="flex items-center mb-8 justify-center">
          <div className="text-green-600">1 Sender Details</div>
          <span className="mx-4 text-gray-400">—</span>
          <div className="text-green-600">2 Receiver Details</div>
          <span className="mx-4 text-gray-400">—</span>
          <div className="flex items-center text-green-600">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
              3
            </div>
            <span className="ml-2 font-semibold">Parcel Details</span>
          </div>
        </div>

        {/* Parcel form */}
        <div className="bg-white p-8 rounded-lg shadow w-full max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Parcel Details
          </h2>

          <form className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Parcel Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                >
                  <option value="">Select Category</option>
                  <option value="documents">Documents</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Parcel Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter Weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Parcel Length (cm)
                </label>
                <input
                  type="number"
                  name="length"
                  placeholder="Enter Length"
                  value={formData.length}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Parcel Width (cm)
                </label>
                <input
                  type="number"
                  name="width"
                  placeholder="Enter Width"
                  value={formData.width}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Parcel Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  placeholder="Enter Height"
                  value={formData.height}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">
                  Parcel Estimated Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter Estimated Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
            </div>
          </form>

          <div className="flex justify-end mt-8">
            {/* <button
              onClick={() => navigate("/send-parcel/receiver-details")}
              className="bg-gray-300 text-black px-8 py-3 rounded hover:bg-gray-400"
            >
              Back
            </button> */}
            <button
              onClick={handleNext}
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ParcelDetails;
