import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { fetchParcelById } from "../../Redux/Slice/parcelSlice";
import Footer from "../../Components/Footer/Footer";
import { formatDistanceToNowStrict } from "date-fns";
import ApiService from "../../Service/ApiService";
import Model from "../../Components/Model/Model";
import map from "../../assets/map.png";

const DeliveryParcelDetails = () => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [view, setView] = useState("summary");
  const { parcelId } = useParams();
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const {
    currentParcel: parcel,
    loading,
    error,
  } = useSelector((state) => state.parcel);

  useEffect(() => {
    if (parcelId) {
      dispatch(fetchParcelById(parcelId));
    }
  }, [dispatch, parcelId]);

  if (loading) return <div>Loading parcel summary...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!parcel) return null;

  const deliveryAccept = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await ApiService.post(
        "delivery/accept",
        {
          requestId: parcelId,
        },
        token
      );
      if (response.data.success) {
        console.log("delivery accepted", response.data);

        setShowAcceptModal(true);
        dispatch(fetchParcelById(parcelId));
      } else {
        console.error("Delivery accept failed:", response.data.message);
      }
    } catch (error) {
      console.error("Delivery accept failed:", error);
    }
  };

  const deliveryReject = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await ApiService.post(
        "delivery/reject",
        {
          requestId: parcelId,
        },
        token
      );
      if (response.data.success) {
        setShowRejectModal(true);
      } else {
        console.error("Delivery reject failed:", response.data.message);
      }
    } catch (error) {
      console.error("Delivery reject failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 max-w-screen-lg mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">Parcel Details</h1>
        </header>
        {/* Order ID + Status */}
        <div
          key={parcel._id}
          className="bg-gray-50 rounded-lg cursor-pointer shadow p-6 flex flex-col items-start mb-6"
        >
          <div className="flex justify-between w-full items-center gap-10">
            <p className="text-gray-600">Parcel ID: {parcel._id}</p>
            <span
              onClick={() => setView(view === "track" ? "summary" : "track")}
              className="text-green-500 font-semibold cursor-pointer"
            >
              {view === "track" ? "Summary" : "MapView"}
            </span>
          </div>

          <h3 className="font-bold text-black my-2">
            {parcel.status === "pending" &&
            parcel.partnerStatus?.[userId] !== "accepted"
              ? "Waiting for your Acceptance"
              : parcel.status === "assigned"
              ? "Sender Accepted"
              : parcel.partnerStatus?.[userId] === "accepted"
              ? "Waiting for Sender Acknowledgement"
              : parcel.status}
          </h3>

          <p className=" text-sm text-gray-500">
            Last Update:{" "}
            {formatDistanceToNowStrict(new Date(parcel.lastUpdate), {
              addSuffix: true,
            })}
          </p>
        </div>

        <div>
          {view === "track" ? (
            <div className="w-full">
              {/* Map */}
              <div className="w-full flex items-center justify-center">
                <img
                  src={map}
                  alt="map"
                  className="w-full h-fit object-cover rounded-lg block"
                />
              </div>

              {/* Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Sender / Receiver Card */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  {/* Sender */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800">
                      {parcel.sender?.name} (Sender)
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                      {parcel.sender?.address}, {parcel.sender?.city},{" "}
                      {parcel.sender?.state}
                    </p>
                  </div>

                  {/* Receiver */}
                  <div>
                    {/* <h3 className="font-semibold text-gray-800">
                      {parcel.receiver?.name} (Receiver)
                    </h3> */}
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                      {parcel.receiver?.address}, {parcel.receiver?.city},{" "}
                      {parcel.receiver?.state}
                    </p>
                  </div>
                </div>

                {/* Delivery Status Card */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Delivery Status
                  </h3>
                  <div className="space-y-4">
                    {parcel.tracking && parcel.tracking.length > 0 ? (
                      parcel.tracking.map((event, index) => (
                        <div key={index} className="flex items-start">
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center mr-3">
                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                            {index < parcel.tracking.length - 1 && (
                              <div className="h-8 w-px bg-gray-300"></div>
                            )}
                          </div>
                          {/* Event details */}
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {event.status}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(event.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No delivery updates available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sender */}
              <div className="bg-gray-50 shadow rounded-2xl p-6">
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
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-600">Address</span>
                    <span className="font-medium text-right">
                      {parcel.sender.address}, {parcel.sender.city},{" "}
                      {parcel.sender.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* Receiver */}
              <div className="bg-gray-50 shadow rounded-2xl p-6">
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
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-600">Address</span>
                    <span className="font-medium text-right">
                      {parcel.receiver.address}, {parcel.receiver.city},{" "}
                      {parcel.receiver.state}
                    </span>
                  </div>
                </div>
              </div>

              {/* Parcel */}
              <div className="bg-gray-50 shadow rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-3">Parcel Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">
                      {parcel.parcel.productName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">{parcel.parcel.weight}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-medium">
                      {parcel.parcel.length} L, {parcel.parcel.width} W,{" "}
                      {parcel.parcel.height} H
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Special Instructions</span>
                    <span className="font-medium">
                      Handle with care, fragile
                    </span>
                  </div>
                </div>
              </div>
              {/* Payment */}
              <div className="bg-gray-50 shadow rounded-2xl p-6">
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
                      ₹{parcel.parcel.estimatedAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          {/* Show Accept + Reject only if pending AND I have not accepted */}
          {parcel.status === "pending" &&
            parcel.partnerStatus?.[userId] !== "accepted" && (
              <>
                <button
                  onClick={deliveryAccept}
                  className="w-40 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:from-green-600 hover:to-green-800 transition duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={deliveryReject}
                  className="w-40 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:from-red-600 hover:to-red-800 transition duration-300"
                >
                  Reject
                </button>
              </>
            )}

          {/* After accepted → show Cancel Delivery only */}
          {parcel.partnerStatus?.[userId] === "accepted" &&
            parcel.status !== "assigned" && (
              <button
                onClick={deliveryReject} // or a dedicated cancel API
                className="w-40 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:from-red-600 hover:to-red-800 transition duration-300"
              >
                Cancel Delivery
              </button>
            )}

          {/* When assigned → show Start Delivery */}
          {parcel.status === "assigned" && (
            <button className="w-40 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:from-green-600 hover:to-green-800 transition duration-300">
              Start Delivery
            </button>
          )}
        </div>
      </main>
      <Footer />

      {/* Accept Modal */}
      {showAcceptModal && (
        <Model
          isOpen={showAcceptModal}
          title="Delivery Accepted"
          message="You have successfully accepted the delivery."
          buttonText="Done"
          onClose={() => setShowAcceptModal(false)}
        />
      )}
      {/* Reject Modal */}
      {showRejectModal && (
        <Model
          isOpen={showRejectModal}
          title="Delivery Rejected"
          message="You have successfully rejected the delivery."
          buttonText="Done"
          onClose={() => setShowRejectModal(false)}
        />
      )}
    </div>
  );
};

export default DeliveryParcelDetails;
