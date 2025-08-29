import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNowStrict } from "date-fns";
import { fetchParcelById } from "../../Redux/Slice/parcelSlice";
import { fetchAcceptedPartners } from "../../Redux/Slice/acceptedPartnersSlice";

const ParcelSummary = () => {
  const IMG_URL = import.meta.env.VITE_REACT_IMAGE_URL;
  const { parcelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const otp = location.state?.otp;
  

  const {
    currentParcel: parcel,
    loading: parcelLoading,
    error: parcelError,
  } = useSelector((state) => state.parcel);

  const {
    partners,
    loading: partnersLoading,
    error: partnersError,
  } = useSelector((state) => state.acceptedPartners);

  useEffect(() => {
    if (parcelId) {
      dispatch(fetchParcelById(parcelId));
      dispatch(fetchAcceptedPartners(parcelId));
    }
  }, [dispatch, parcelId]);

  if (parcelLoading || partnersLoading) {
    return <div className="text-center py-10">Loading parcel summary...</div>;
  }

  if (parcelError) return <div>Error: {parcelError}</div>;
  if (partnersError) return <div>Error: {partnersError}</div>;

  if (!parcel) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 max-w-screen-lg mx-auto px-4 py-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-center">Parcel Summary</h1>
        </header>

        {/* Order ID + Status */}
        <div className="bg-white shadow rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Left side info */}
          <div>
            <p className="text-lg font-semibold">Parcel ID: {parcel._id}</p>
            {otp && (
              <div className="inline-block px-4 py-1 my-1 bg-red-400  font-bold rounded-lg shadow">
                OTP : {otp}
              </div>
            )}
            {parcel?.status === "assigned" && (
              <p className="text-green-600 font-semibold">
                On the way to pick up location
              </p>
            )}

            <p className="text-sm text-gray-500">
              Last Update:
              {formatDistanceToNowStrict(new Date(parcel.lastUpdate), {
                addSuffix: true,
              })}
            </p>
          </div>

          {/* Right side - Accepted Partners */}
          {!otp && (
            <div className="flex flex-col items-center mt-4 md:mt-0">
              {partners.length === 0 ? (
                <p className="font-bold text-black">
                  Searching for delivery person...
                </p>
              ) : (
                <div className="flex items-center gap-2 mt-4">
                  {/* Profile images */}
                  <div className="flex -space-x-3">
                    {partners.map((partner) => (
                      <img
                        key={partner._id}
                        src={
                          partner?.profileImage
                            ? `${IMG_URL}/${partner.profileImage}`
                            : "fallback-image.jpg"
                        }
                        alt={partner?.name || "Partner"}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>

                  {/* Choose Delivery Person button */}
                  <button
                    onClick={() =>
                      navigate(`/send-parcel/delivery-persons/${parcelId}`)
                    }
                    className="text-green-600 font-semibold px-3 py-1 rounded hover:underline"
                  >
                    Choose Delivery Person
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Sender Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{parcel.sender.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{parcel.sender.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">{parcel.sender.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address</span>
                <span className="font-medium text-right">
                  {parcel.sender.address}, {parcel.sender.city},{" "}
                  {parcel.sender.state}
                </span>
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Receiver Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{parcel.receiver.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{parcel.receiver.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">{parcel.receiver.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address</span>
                <span className="font-medium text-right">
                  {parcel.receiver.address}, {parcel.receiver.city},{" "}
                  {parcel.receiver.state}
                </span>
              </div>
            </div>
          </div>

          {/* Parcel */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Parcel Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{parcel.parcel.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight</span>
                <span className="font-medium">{parcel.parcel.weight}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Dimensions</span>
                <span className="font-medium">
                  {parcel.parcel.length} Length, {parcel.parcel.width} Width,{" "}
                  {parcel.parcel.height} Height
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Special Instructions</span>
                <span className="font-medium">Handle with care, fragile</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-3">Payment Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Type</span>
                <span className="font-medium">
                  {parcel.payment.paymentType}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Amount</span>
                <span className="font-medium">
                  ${parcel.parcel.estimatedAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="flex justify-center mt-5">
          {!otp && (
            <button className="w-44 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:from-red-600 hover:to-red-800 transition duration-300">
              Cancel Booking
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ParcelSummary;
