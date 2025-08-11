import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import cube from "../../assets/parcel.png";
import van from "../../assets/van.png";
import { useNavigate } from "react-router-dom";

const SendParcel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Send Parcel</h1>
        <p className="text-gray-600 mb-10">
          Just a few steps to send parcel anywhere you want.
        </p>

        {/* Top section: Send Parcel card + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left card */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
            <img src={cube} alt="Send Parcel Icon" className="w-20 h-20 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Send Parcels</h2>
            <p className="text-gray-600 mb-6 text-md">
              Click here to send parcels to anyone to their <br /> doorstep with
              ease and reliability.
            </p>
            <button
              onClick={() => navigate("/send-parcel/sender-details")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Send Parcel
            </button>
          </div>

          {/* Right image */}
          <div>
            <img
              src={van}
              alt="Delivery Van"
              className="rounded-md w-full object-cover"
            />
          </div>
        </div>

        {/* Steps section */}
        <section className="bg-[#FAFAFB] rounded-xl p-8 py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Steps to Send Delivery
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4 bg-white rounded-lg shadow p-5">
              <div className="flex-shrink-0 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-green-600">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">Book Delivery</h3>
                <p className="text-gray-600">
                  Access our intuitive platform to quickly find and accept
                  delivery requests that match your route and schedule.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 bg-white rounded-lg shadow p-5">
              <div className="flex-shrink-0 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-green-600">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Choose Delivery Partner
                </h3>
                <p className="text-gray-600">
                  Connect with reliable delivery partners from our network,
                  ensuring efficient and timely package handling.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 bg-white rounded-lg shadow p-5">
              <div className="flex-shrink-0 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-green-600">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track Your Order</h3>
                <p className="text-gray-600">
                  Monitor your parcel's journey in real-time with our advanced
                  tracking system, from pickup to final delivery.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 bg-white rounded-lg shadow p-5">
              <div className="flex-shrink-0 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-green-600">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg">Deliver at Doorstep</h3>
                <p className="text-gray-600">
                  Complete deliveries with ease, ensuring customer satisfaction
                  with secure and prompt doorstep service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SendParcel;
