import delivery_van from "../../assets/deliveryvan.png";
import shifter from "../../assets/shifter.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center bg-white">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-6 lg:pl-32 flex flex-col justify-center items-start text-left">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Your journey, <br /> delivered with <br /> precision.
        </h1>
        <p className="text-gray-600 mb-6 max-w-md text-[18px]">
          Experience reliable, real-time tracking and seamless delivery for all
          your parcels, every step of the way.
        </p>
        <img src={delivery_van} alt="Delivery Van" className="w-80 h-auto" />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:pr-32">
        <img src={shifter} alt="Shifter Logo" className="w-72 h-auto mb-4" />

        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md w-80 mb-3"
          onClick={handleLogin}
        >
          Get Started
        </button>
        {/* <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-2 rounded-md w-80">
          Sign Up
        </button> */}
      </div>
    </div>
  );
};

export default Welcome;
