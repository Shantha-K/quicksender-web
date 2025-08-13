import { useNavigate } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import SideBar from "../../../Components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchmyWallet } from "../../../Redux/Slice/MyWalletSlice";
import { fetchRegisteredUser } from "../../../Redux/Slice/userSlice";
import { formatDistanceToNowStrict } from "date-fns";

const Mywallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { balance, transactions, loading, error } = useSelector(
    (state) => state.myWallet
  );

  useEffect(() => {
    dispatch(fetchmyWallet());
    dispatch(fetchRegisteredUser());
  }, [dispatch]);
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
          <div className="mx-auto p-6 rounded-xl shadow">
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
            {/* Transaction History */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">
                Transaction History
              </h3>
              {balance && transactions?.length > 0 ? (
                <div className="space-y-4">
                  {transactions?.length > 0 ? (
                    transactions.map((tx, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-semibold capitalize">
                            {tx.type === "topup"
                              ? "Top up successful"
                              : tx.type}
                          </h4>
                          <p className="text-gray-500 text-sm">
                            You successfully {tx.type} your wallet for $
                            {tx.amount}
                          </p>
                        </div>
                        <div className="text-gray-400 text-sm">
                          {formatDistanceToNowStrict(new Date(tx.date), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Records Found</p>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12 text-gray-500 mb-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6l2-2h12l2 2"
                      />
                    </svg>
                    <p className="text-gray-500">No Records Found</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => navigate("/profile/topup")}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600"
                >
                  Top - up wallet
                </button>
                <button
                  onClick={() => navigate("/profile/withdraw")}
                  className="border border-emerald-500 text-emerald-500 px-6 py-2 rounded-full hover:bg-green-50"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mywallet;
