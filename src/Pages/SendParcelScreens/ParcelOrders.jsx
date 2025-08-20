import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import location from "../../assets/location.png";
import complete_icon from "../../assets/complete_icon.png";
import delivary_icon from "../../assets/delivary_icon.png";
import van_icon from "../../assets/van_icon.png";
import ApiService from "../../Service/ApiService";
import { useEffect, useState } from "react";

const ParcelOrders = () => {
  const [parcels, setParcels] = useState([]);

  const fetchParcels = async () => {
    try {
      const response = await ApiService.get("delivery/requests", {
        status: "pending",
      });
      if (response.data.success) {
        setParcels(response.data.data);
      } else {
        console.warn("API response", response.data.message);
        setParcels([]);
      }
    } catch (error) {
      console.error("Error fetching parcels:", error);
    }
  };
  useEffect(() => {
    fetchParcels();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-center">Parcel Details</h1>
        </header>

        {/* Top Section: Parcel Status + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-16">
          {/* Parcel Status Card */}
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-start"
            >
              {/* Top Row: Parcel ID + Summary */}
              <div className="flex justify-between w-full items-center mb-2">
                <p className="text-gray-600">
                  Parcel ID:{" "}
                  <span className="font-bold text-black">{parcel._id}</span>
                </p>
                <span className="text-green-500 font-semibold">Summary</span>
              </div>

              {/* Status */}
              <h3 className="font-bold text-black">
                {parcel.status === "pending"
                  ? "Searching Deliver Person"
                  : parcel.status}
              </h3>

              {/* Last Update */}
              <p className="mt-4 text-sm text-gray-500">
                Last Update: {new Date(parcel.lastUpdate).toLocaleString()}
              </p>
            </div>
          ))}

          {/* Map Image */}
          <div className="h-96">
            <img
              src={location}
              alt="Delivery Map"
              className="rounded-md w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Delivery Event Timeline */}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Delivery Event Timeline
          </h2>

          <div className="relative pl-12">
            {/* Vertical line */}
            <div className="absolute top-0 left-5 w-0.5 h-full bg-gray-300"></div>

            {/* Event 1 */}
            <div className="relative flex items-start mb-10">
              {/* Icon + Text */}
              <img src={van_icon} alt="Van Icon" className="w-14 h-14 mr-4" />
              <div>
                <p className="font-medium">
                  Parcel handed over to the delivery person.
                </p>
                <p className="text-sm text-gray-500">21.08.2020 - 16:10</p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative flex items-start mb-10">
              <img
                src={delivary_icon}
                alt="Delivery Icon"
                className="w-14 h-14 mr-4"
              />
              <div>
                <p className="font-medium">Parcel on the way.</p>
                <p className="text-sm text-gray-500">21.08.2020 - 8:23</p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative flex items-start">
              <img
                src={complete_icon}
                alt="Complete Icon"
                className="w-14 h-14 mr-4"
              />
              <div>
                <p className="font-medium">Parcel Delivered</p>
                <p className="text-sm text-gray-500">20.08.2020 - 18:48</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ParcelOrders;

//  <main className="flex-1 max-w-7xl mx-auto px-4 py-10">
//         {/* Header */}
//         <header className="mb-12">
//           <h1 className="text-3xl font-bold text-center">Parcel Details</h1>
//         </header>

//         {/* Top Section: Parcel Status + Map */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-16">
//           {/* Parcel Status Card */}
//           <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start h-72">
//             <h2 className="text-xl font-semibold mb-4">Parcel Status</h2>
//             <p className="text-gray-600">
//               Parcel ID:{" "}
//               <span className="font-bold text-black">00359007738060313786</span>
//             </p>
//             <p className="mt-3 text-gray-700">Delivery Status:</p>
//             <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md font-semibold">
//               Searching Delivery Person
//             </button>
//             <p className="mt-4 text-sm text-gray-500">
//               Last Update: 3 hours ago
//             </p>
//           </div>

//           {/* Map Image */}
//           <div className="h-96">
//             <img
//               src={location}
//               alt="Delivery Map"
//               className="rounded-md w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Delivery Event Timeline */}
//         <div>
//           <h2 className="text-xl font-semibold mb-6">
//             Delivery Event Timeline
//           </h2>

//           <div className="relative pl-12">
//             {/* Vertical line */}
//             <div className="absolute top-0 left-5 w-0.5 h-full bg-gray-300"></div>

//             {/* Event 1 */}
//             <div className="relative flex items-start mb-10">
//               {/* Icon + Text */}
//               <img src={van_icon} alt="Van Icon" className="w-14 h-14 mr-4" />
//               <div>
//                 <p className="font-medium">
//                   Parcel handed over to the delivery person.
//                 </p>
//                 <p className="text-sm text-gray-500">21.08.2020 - 16:10</p>
//               </div>
//             </div>

//             {/* Event 2 */}
//             <div className="relative flex items-start mb-10">
//               <img
//                 src={delivary_icon}
//                 alt="Delivery Icon"
//                 className="w-14 h-14 mr-4"
//               />
//               <div>
//                 <p className="font-medium">Parcel on the way.</p>
//                 <p className="text-sm text-gray-500">21.08.2020 - 8:23</p>
//               </div>
//             </div>

//             {/* Event 3 */}
//             <div className="relative flex items-start">
//               <img
//                 src={complete_icon}
//                 alt="Complete Icon"
//                 className="w-14 h-14 mr-4"
//               />
//               <div>
//                 <p className="font-medium">Parcel Delivered</p>
//                 <p className="text-sm text-gray-500">20.08.2020 - 18:48</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
