import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import SideBar from "../../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchmyWallet } from "../../../Redux/Slice/MyWalletSlice";
import { fetchRegisteredUser } from "../../../Redux/Slice/userSlice";
import Model from "../../../Components/Model/Model";
import phonepay from "../../../assets/phonepay.png";
import googlepay from "../../../Assets/googlepay.png";
import { FaUniversity } from "react-icons/fa";
import ApiService from "../../../Service/ApiService";

const Withdraw = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { balance } = useSelector((state) => state.myWallet);

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Google Pay");
  const [form, setForm] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [showModal, setShowModal] = useState(false);

  const paymentMethods = [
    { name: "Google Pay", icon: googlepay },
    { name: "Phone Pay", icon: phonepay },
    { name: "Bank Transfer", icon: <FaUniversity size={24} /> },
  ];

  useEffect(() => {
    dispatch(fetchmyWallet());
    dispatch(fetchRegisteredUser());
  }, [dispatch]);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const payload = {
      userId,
      amount: Number(amount),
      ...(paymentMethod === "Bank Transfer" ? form : {}),
    };

    try {
      const response = await ApiService.post("wallet/withdraw", payload, token);
      if (response.data.success) {
        setShowModal(true);
      } else {
        alert("Withdrawal failed");
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
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
            <h2 className="text-3xl font-bold mb-6 text-center">My wallet</h2>
            {/* Wallet Card */}
            <div className="bg-gradient-to-r from-emerald-400 to-green-400 rounded-3xl p-4 shadow-lg text-black max-w-lg mx-auto">
              <p className="text-lg text-center mb-2">My balance</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-semibold">$</span>
                <span className="text-5xl font-bold">{balance}</span>
              </div>

              <div className="mt-6">
                <p className="text-xl font-semibold">{user?.name}</p>
                <p className="tracking-widest mt-2 text-lg font-medium">
                  **** **** **** 3629
                </p>
              </div>
            </div>
            {/* Withdraw Form */}
            <form onSubmit={handleWithdraw} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block mb-2 font-medium">
                  Amount to Withdraw
                </label>
                <input
                  type="number"
                  placeholder="$ 0.00"
                  className="w-full p-3 border rounded-lg"
                  min="10"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block mb-3 font-medium">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-8 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center cursor-pointer gap-2
                   ${
                     paymentMethod === method.name
                       ? "border-green-500 ring-1 ring-green-500"
                       : "border-gray-300"
                   }`}
                      onClick={() => setPaymentMethod(method.name)}
                    >
                      {/* Icon / Image */}
                      {typeof method.icon === "string" ? (
                        <img
                          src={method.icon}
                          alt={method.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        method.icon
                      )}
                      {/* Method Name */}
                      <span className="text-sm font-medium">{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Account Details (only if Bank Transfer selected) */}
              {paymentMethod === "Bank Transfer" && (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Account Holder Name"
                    className="w-full p-3 border rounded-lg"
                    value={form.accountHolder}
                    onChange={(e) =>
                      handleFormChange("accountHolder", e.target.value)
                    }
                  />

                  {/* Bank Name Dropdown */}
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={form.bankName}
                    onChange={(e) =>
                      handleFormChange("bankName", e.target.value)
                    }
                  >
                    <option value="">Select Bank</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">
                      State Bank of India
                    </option>
                    <option value="Axis Bank">Axis Bank</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Account Number"
                    className="w-full p-3 border rounded-lg"
                    value={form.accountNumber}
                    onChange={(e) =>
                      handleFormChange("accountNumber", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    className="w-full p-3 border rounded-lg"
                    value={form.ifscCode}
                    onChange={(e) =>
                      handleFormChange("ifscCode", e.target.value)
                    }
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!amount}
                className={`w-full font-semibold py-3 rounded-lg transition ${
                  amount
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Withdraw ${amount || "0.00"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {showModal && (
        <Model
          isOpen={showModal}
          title="Withdrawal Successful!"
          message="Your withdrawal request has been submitted successfully."
          buttonText="Done"
          onClose={() => navigate("/profile/my-wallet")}
        />
      )}
    </div>
  );
};

export default Withdraw;
