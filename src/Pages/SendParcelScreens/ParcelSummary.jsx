import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../Service/ApiService";
import { formatDistanceToNowStrict } from "date-fns";

const ParcelSummary = () => {
  const { parcelId } = useParams();
  const [parcel, setParcel] = useState(null);

  const fetchParcelSummary = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await ApiService.get(
        `delivery/request/${parcelId}`,
        {},
        token
      );
      if (response.data.success) {
        // console.log("Parcel summary response:", response.data.data);
        setParcel(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching parcel summary:", error);
    }
  };

  useEffect(() => {
    fetchParcelSummary();
  }, [parcelId]);

  if (!parcel) {
    return <div className="text-center py-10">Loading parcel summary...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 max-w-screen-2xl mx-auto px-4 py-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-center">Parcel Summary</h1>
        </header>

        {/* Order ID + Status */}
        <div className="bg-white shadow rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <p className="text-lg font-semibold">Parcel ID: {parcel._id}</p>
            {/* <p className="text-sm text-gray-500">
              Status: <span className="capitalize">{parcel.status}</span>
            </p> */}
            <p className="text-sm text-gray-500">
              Last Update:
              {formatDistanceToNowStrict(new Date(parcel.lastUpdate), {
                addSuffix: true,
              })}
            </p>
          </div>
          <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {parcel.status === "pending"
              ? "Pending Confirmation"
              : parcel.status}
          </span>
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
        <div className="flex justify-center mt-4">
          <button className="w-52 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:from-red-600 hover:to-red-800 transition duration-300">
            Cancel Booking
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ParcelSummary;
