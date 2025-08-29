import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchAcceptedPartners } from "../../Redux/Slice/acceptedPartnersSlice";
import ApiService from "../../Service/ApiService";

const DeliveryPersons = () => {
  const { parcelId } = useParams();
  const IMG_URL = import.meta.env.VITE_REACT_IMAGE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { partners, loading, error } = useSelector(
    (state) => state.acceptedPartners
  );
  useEffect(() => {
    if (parcelId) {
      dispatch(fetchAcceptedPartners(parcelId));
    }
  }, [dispatch, parcelId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAccept = async (partnerId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await ApiService.post(
        "delivery/select-partner",
        {
          requestId: parcelId,
          partnerId,
        },
        token
      );
      if (response.data.success) {
        console.log("response:", response.data);
        const otp = response.data.otp;
        navigate(`/send-parcel/parcel-summary/${parcelId}`, {
          state: { otp }, // pass OTP in navigation state
        });
      } else {
        console.log("error", response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 max-w-screen-xl mx-auto px-4 py-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-center">
            Available Delivery Persons
          </h1>
        </header>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <img
                  src={
                    partner?.profileImage
                      ? `${IMG_URL}/${partner.profileImage}`
                      : "https://via.placeholder.com/50"
                  }
                  alt={partner?.name || "profile"}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold">{partner?.name}</h2>
                    {/* <span className="text-sm text-red-500 font-medium">
                      5 KM
                    </span> */}
                  </div>
                  <p className="text-gray-600 text-sm">{partner?.address}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {/* Rating (use partner.rating if available, else fallback) */}
                    <span className="font-medium">
                      {partner?.rating || "No Ratings"}
                    </span>
                    <span className="text-yellow-500">⭐</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {partner?.reviews || "No Reviews"}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                    {partner?.successfulDeliveries || "No  Deliveries"}
                  </p>
                  <a href="#" className="text-green-600 text-sm font-medium">
                    View all Reviews
                  </a>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAccept(partner._id)}
                  className="w-40 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:from-green-600 hover:to-green-800 transition duration-300"
                >
                  Accept
                </button>
                <button className="w-40 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:from-red-600 hover:to-red-800 transition duration-300">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryPersons;
