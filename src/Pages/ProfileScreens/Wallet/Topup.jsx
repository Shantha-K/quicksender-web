import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import SideBar from "../../../Components/Sidebar/Sidebar";
import { useState } from "react";
import ApiService from "../../../Service/ApiService";
import Model from "../../../Components/Model/Model";
import phonepay from "../../../assets/phonepay.png";
import googlepay from "../../../Assets/googlepay.png";
import { FaCreditCard, FaUniversity } from "react-icons/fa";
import { LuCircleCheckBig } from "react-icons/lu";

const Topup = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Google Pay");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const paymentMethods = [
    { name: "Google Pay", icon: googlepay },
    { name: "Phone Pay", icon: phonepay },
    { name: "Add Another Credit Card", icon: <FaCreditCard size={24} /> },
    { name: "Add Debit Card", icon: <FaUniversity size={24} /> },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const payload = {
      userId,
      amount: Number(amount),
    };
    try {
      const response = await ApiService.post("wallet/topup", payload, token);
      console.log("topup", response.data);
      if (response.data.success) {
        setShowModal(true);
      } else {
        alert("Top-up failed:");
      }
    } catch (error) {
      console.error("Error during top-up:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="h-full">
          <SideBar />
        </div>
        {/* Main Content */}
        <div
          className="flex-1 p-8 overflow-y-auto"
          style={{ backgroundColor: "#F2FCF8" }}
        >
          <div className="mx-auto py-6 px-8 rounded-xl shadow">
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-6 text-center">
              Top-up wallet
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block mb-2 font-medium">
                  Enter the amount of Top-up
                </label>
                <input
                  type="number"
                  placeholder="$ 0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-bold mb-2">Payment Method</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Select the payment method you want to use
                </p>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className={`p-4 border rounded-lg flex items-center justify-between cursor-pointer ${
                        paymentMethod === method.name
                          ? "border-green-500 ring-1 ring-green-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(method.name)}
                    >
                      <div className="flex items-center gap-3">
                        {typeof method.icon === "string" ? (
                          <img
                            src={method.icon}
                            alt={method.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          method.icon
                        )}
                        <span>{method.name}</span>
                      </div>
                      {paymentMethod === method.name && (
                        <LuCircleCheckBig
                          className="text-green-500"
                          size={20}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={!amount || Number(amount) <= 0}
                className={`w-full font-bold py-3 rounded-lg transition
             ${
               amount && Number(amount) > 0
                 ? "bg-green-500 hover:bg-green-600 text-white"
                 : "bg-gray-300 text-gray-600 cursor-not-allowed"
             }`}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {showModal && (
        <Model
          isOpen={showModal}
          title="Top-up Successful!"
          message="The balance will be added to your wallet."
          buttonText="Done"
          onClose={() => navigate("/profile/my-wallet")}
        />
      )}
    </div>
  );
};

export default Topup;
