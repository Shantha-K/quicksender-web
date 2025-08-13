import noparcel from "../../assets/noparcel.png";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";

const DeliveryDetails = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4">Delivery Details</h1>
        <img src={noparcel} alt="No parcels" className="w-80 h-[h-auto] mb-4" />
        <p className="text-gray-500">No parcels received yet to deliver</p>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryDetails;
