import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import calculator from "../../assets/calculator.png";
import { useState } from "react";
import ApiService from "../../Service/ApiService";
import Model from "../../Components/Model/Model";

const Calculator = () => {
  const [tab, setTab] = useState("domestic");
  const [formData, setFormData] = useState({
    country: "India",
    fromCity: "",
    toCity: "",
    parcelWeight: "",
    parcelLength: "",
    parcelWidth: "",
    parcelHeight: "",
  });
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        type: tab, // domestic or international
        ...formData,
      };
      const response = await ApiService.post("/calculate-rate", payload);
      if (response.data) {
        setResult(response.data.rate);
        setShowModal(true);
        setFormData({
          country: "India",
          fromCity: "",
          toCity: "",
          parcelWeight: "",
          parcelLength: "",
          parcelWidth: "",
          parcelHeight: "",
        });
      } else {
        alert("Failed to calculate rate. Please try again.");
      }
    } catch (error) {
      console.error("Error calculating rate:", error);
      setResult({ error: "Failed to calculate rate" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Section 1 - Header with Image */}
      <div className="flex-1 flex items-center justify-center bg-green-50 px-8 py-16">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section - Text */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Rate Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Check our rates and send parcels to anywhere in the world, quickly
              and affordably.
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center">
            <img
              src={calculator}
              alt="Calculator"
              className="w-72 md:w-96 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Section 2 - Parcel Rate Form */}
      <div className="flex-1 flex justify-center items-center px-6 py-12 bg-white">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Calculate Your Parcel Rate
          </h2>

          {/* Tabs */}
          <div className="flex mb-6">
            <button
              onClick={() => setTab("domestic")}
              className={`px-4 py-2 rounded-l-md font-medium ${
                tab === "domestic"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Domestic
            </button>
            <button
              onClick={() => setTab("international")}
              className={`px-4 py-2 rounded-r-md font-medium ${
                tab === "international"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              International
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border rounded-md p-3"
            >
              <option value="India">India</option>
            </select>

            <select
              name="fromCity"
              value={formData.fromCity}
              onChange={handleChange}
              className="border rounded-md p-3"
            >
              <option value="">From City</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
            </select>

            <select
              name="toCity"
              value={formData.toCity}
              onChange={handleChange}
              className="border rounded-md p-3"
            >
              <option value="">To City</option>
              <option value="kolkata">Kolkata</option>
              <option value="pune">Pune</option>
            </select>

            <input
              type="number"
              name="parcelWeight"
              value={formData.parcelWeight}
              onChange={handleChange}
              placeholder="Parcel Weight (kg)"
              className="border rounded-md p-3 md:col-span-1"
            />
            <input
              type="number"
              name="parcelLength"
              value={formData.parcelLength}
              onChange={handleChange}
              placeholder="Parcel Length (cm)"
              className="border rounded-md p-3 md:col-span-2"
            />

            <input
              type="number"
              name="parcelWidth"
              value={formData.parcelWidth}
              onChange={handleChange}
              placeholder="Parcel Width (cm)"
              className="border rounded-md p-3 md:col-span-2"
            />
            <input
              type="number"
              name="parcelHeight"
              value={formData.parcelHeight}
              onChange={handleChange}
              placeholder="Parcel Height (cm)"
              className="border rounded-md p-3 md:col-span-1"
            />

            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold"
              >
                Calculate
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
      {/* Modal for Rate Details */}
      {showModal && (
        <Model
          isOpen={showModal}
          title={`₹ ${result}`}
          message="Estimated parcel rate"
          buttonText="Done"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Calculator;
