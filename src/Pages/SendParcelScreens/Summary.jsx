import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";
import ApiService from "../../Service/ApiService";

const Summary = () => {
  const location = useLocation();
  const { sender, receiver, parcel } = location.state || {};

  const payment = {
    paymentType: "Wallet",
    deliveryFee: "$30",
  };

  const Card = ({ title, children }) => (
    <div className="bg-[#C9FFDD] p-5 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="space-y-1 text-gray-800">{children}</div>
    </div>
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not logged in.");
      return;
    }
    try {
      const payload = {
        sender: {
          name: sender?.name,
          email: sender?.email,
          phone: sender?.phone,
          address: sender?.address,
          state: sender?.state,
          city: sender?.city,
        },
        receiver: {
          name: receiver?.name,
          email: receiver?.email,
          phone: receiver?.phone,
          address: receiver?.address,
          state: receiver?.state,
          city: receiver?.city,
        },
        parcel: {
          productName: parcel?.category,
          weight: `${parcel?.weight} kg`,
          length: `${parcel?.length} cm`,
          width: `${parcel?.width} cm`,
          height: `${parcel?.height} cm`,
          estimatedAmount: parcel?.amount,
        },
        payment: {
          paymentType: payment.paymentType,
          deliveryFee: payment.deliveryFee,
        },
      };
      const response = await ApiService.post(
        "/delivery/request",
        payload,
        token
      );
      if (response.data?.success) {
        console.log("Delivery request successful:", response.data);
        alert("Payment & delivery request submitted successfully!");
      } else {
        console.error("Delivery request failed:", response.data?.message);
        alert(response.data?.message || "Payment failed");
      }
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert("An error occurred while processing your request");
    }
  };

  return (
    <div>
      <NavBar />

      <div className="p-6 flex flex-wrap gap-6 justify-center">
        <Card title="Sender">
          <p>{sender?.name}</p>
          <p>{sender?.email}</p>
          <p>{sender?.phone}</p>
          <p>{sender?.address}</p>
        </Card>

        <Card title="Receiver">
          <p>{receiver?.name}</p>
          <p>{receiver?.email}</p>
          <p>{receiver?.phone}</p>
          <p>{receiver?.address}</p>
        </Card>

        <Card title="Parcel">
          <p>{parcel.category}</p>
          <p>
            {parcel.weight} kg Weight, {parcel.length} cm Length, {parcel.width}{" "}
            cm Width, {parcel.height} cm Height
          </p>
        </Card>

        <Card title="Parcel Estimated Amount">
          <p>${parcel.amount}</p>
        </Card>

        <Card title="Payment">
          <p>Payment Type : {payment.paymentType}</p>
          <p>Delivery Fee : {payment.deliveryFee}</p>
        </Card>
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={handlePayment}
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition w-48"
        >
          Pay ${30}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Summary;
