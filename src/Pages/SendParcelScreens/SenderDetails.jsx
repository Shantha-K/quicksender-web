import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import { State, City, Country } from "country-state-city";

const SenderDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    address: "",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setCities(City.getCitiesOfState("IN", value)); // fetch cities for selected state
      setFormData((prev) => ({
        ...prev,
        state: value,
        city: "", // reset city when state changes
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    setStates(State.getStatesOfCountry("IN")); // load Indian states once
  }, []);

  const handleNext = () => {
    const payload = {
      ...formData,
    };
    navigate("/send-parcel/receiver-details", { state: { sender: payload } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 w-full px-4 py-8">
        {/* Stepper */}
        <div className="flex items-center mb-8 justify-center">
          <div className="flex items-center text-green-600">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
              1
            </div>
            <span className="ml-2 font-semibold">Sender Details</span>
          </div>
          <span className="mx-4 text-gray-400">—</span>
          <div className="text-gray-400">2 Receiver Details</div>
          <span className="mx-4 text-gray-400">—</span>
          <div className="text-gray-400">3 Parcel Details</div>
        </div>

        {/* Sender form */}
        <div className="bg-white p-8 rounded-lg shadow w-full max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Sender Details
          </h2>

          <form className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Sender Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Sender Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Sender Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <label className="block mb-2 font-medium">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 4 */}
            <div>
              <label className="block mb-2 font-medium">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Sender Address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />
            </div>
          </form>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SenderDetails;
