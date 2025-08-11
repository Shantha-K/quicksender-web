import sendparcel from "../../assets/sendparcel.png";
import deliveryparcel from "../../assets/deliveryparcel.png";
import noparcel from "../../assets/noparcel.png";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 px-8 py-10 bg-white grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 ">
          <h2 className="text-xl font-semibold mb-8">My Parcels</h2>
          <div className="max-w-lg mb-2">
            <p className="mb-3">Enter Parcel Number</p>
            {/* Input */}
            <div className="border border-black rounded-lg p-4 mb-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Tracking Number"
                className="w-full outline-none text-md text-gray-700"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-black text-white py-3  rounded-lg">
              Track Parcel
            </button>
          </div>

          <div className="flex flex-col items-start gap-2">
            <img src={noparcel} alt="No parcels" className="w-80 h-72 mb-4" />
            <p className="text-gray-500">No parcels found!</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-green-300 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Send Parcel</h3>
            <p className="text-sm text-gray-600 mb-2">
              Send your parcel from any location to any destination worldwide.
            </p>
            <img
              src={sendparcel}
              alt="Send parcel"
              className="w-full rounded"
            />
          </div>

          <div className="border border-green-300 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Delivery Parcel</h3>
            <p className="text-sm text-gray-600 mb-2">
              Arrange for safe and timely delivery of your packages.
            </p>
            <img
              src={deliveryparcel}
              alt="Delivery parcel"
              className="w-full rounded"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
