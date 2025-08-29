import { useEffect, useState } from "react";
import noparcel from "../../assets/noparcel.png";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import ApiService from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";

const DeliveryParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchParcels = async () => {
    try {
      const response = await ApiService.get("delivery/available");
      if (response.data.success) {
        const userId = localStorage.getItem("userId");

        const filteredParcels = response.data.data.filter(
          (parcel) => parcel.userId !== userId
        );

        setParcels(filteredParcels);
      } else {
        setParcels([]);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setParcels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const handleParcelDetails = (parcelId) => {
    navigate(`/delivery-partner/delivery-parcel-details/${parcelId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        {loading ? (
          <p className="text-gray-500">Loading parcels...</p>
        ) : parcels.length === 0 ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Delivery Parcels</h1>
            <img src={noparcel} alt="No parcels" className="w-80 h-auto mb-4" />
            <p className="text-gray-500">No parcels received yet to deliver</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Delivery Parcels</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {parcels.map((parcel) => (
                <div
                  key={parcel._id}
                  onClick={() => handleParcelDetails(parcel._id)}
                  className="rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
                >
                  <div className="bg-orange-400 flex justify-between items-center px-4 py-2 text-black">
                    <span className="font-bold">ID: {parcel._id}</span>
                    <span className="font-bold">
                      ₹{parcel.parcel.estimatedAmount}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-bold text-lg text-black">
                        {parcel.sender.name}
                      </h2>
                      <span className="text-green-600 font-bold">
                        {parcel.parcel.weight}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-10">
                      {/* Pickup */}
                      <div className="flex items-start mb-6">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white bg-green-500"></div>
                        <p className="text-black">
                          {parcel.sender.address}, {parcel.sender.city},{" "}
                          {parcel.sender.state}
                        </p>
                      </div>

                      {/* Connector line */}
                      <div className="absolute left-3 top-7 bottom-6 border-l-2 border-dashed border-gray-400"></div>

                      {/* Drop */}
                      <div className="flex items-start">
                        <div className="absolute left-0 w-6 h-6 rounded-full border-4 border-white bg-red-400"></div>
                        <p className="text-black">
                          {parcel.receiver.address}, {parcel.receiver.city},{" "}
                          {parcel.receiver.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryParcels;
