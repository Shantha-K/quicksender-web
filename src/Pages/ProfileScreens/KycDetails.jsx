import Model from "../../Components/Model/Model";
import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";
import { useRef, useState } from "react";
import { FaCamera, FaUpload } from "react-icons/fa";
import ApiService from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";

const KycDetails = () => {
  const [idType, setIdType] = useState("");
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);

  const handleFileChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    }
  };
  const handleKycSubmit = async (e) => {
    e.preventDefault();

    if (
      !idType ||
      !frontInputRef.current?.files[0] ||
      !backInputRef.current?.files[0]
    ) {
      alert("Please fill in all fields and upload both images.");
      return;
    }

    const formData = new FormData();
    formData.append("kycType", idType);
    formData.append("kycFront", frontInputRef.current.files[0]);
    formData.append("kycBack", backInputRef.current.files[0]);

    const userId = localStorage.getItem("userId");
    formData.append("userId", userId);

    try {
      const token = localStorage.getItem("token");
      const response = await ApiService.postFormData("/kyc", formData, token);

      if (response.data.success) {
        setShowModal(true);
        console.log("KYC response:", response.data.data);
      } else {
        alert(response.data.message || "KYC submission failed.");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "An error occurred.");
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
          <div className="mx-auto p-8 rounded-xl shadow">
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-6">KYC Details</h2>

            {/* Select ID Proof Type */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Select ID Proof Type
              </label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="w-full border rounded-md p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose an ID type</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="pan">PAN Card</option>
                <option value="passport">Passport</option>
              </select>
            </div>

            {/* Upload Info */}
            <p className="text-gray-600 mb-4">
              Upload front & back side of your ID Proof. Supports: JPG, PNG,
              PDF.
            </p>

            {/* Upload Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Front of ID */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center h-48">
                {frontPreview ? (
                  <img
                    src={frontPreview}
                    alt="Front of ID"
                    className="h-full object-contain rounded-lg"
                  />
                ) : (
                  <>
                    <FaCamera className="text-3xl text-gray-500 mb-2" />
                    <p className="mb-2 font-medium">Front of ID</p>
                  </>
                )}
                <button
                  onClick={() => frontInputRef.current.click()}
                  className="p-2 border rounded-md hover:bg-gray-100 mt-2"
                >
                  <FaUpload className="text-gray-500" />
                </button>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  ref={frontInputRef}
                  onChange={(e) => handleFileChange(e, setFrontPreview)}
                  className="hidden"
                />
              </div>

              {/* Back of ID */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center h-48">
                {backPreview ? (
                  <img
                    src={backPreview}
                    alt="Back of ID"
                    className="h-full object-contain rounded-lg"
                  />
                ) : (
                  <>
                    <FaCamera className="text-3xl text-gray-500 mb-2" />
                    <p className="mb-2 font-medium">Back of ID</p>
                  </>
                )}
                <button
                  onClick={() => backInputRef.current.click()}
                  className="p-2 border rounded-md hover:bg-gray-100 mt-2"
                >
                  <FaUpload className="text-gray-500" />
                </button>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  ref={backInputRef}
                  onChange={(e) => handleFileChange(e, setBackPreview)}
                  className="hidden"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                onClick={handleKycSubmit}
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg w-40"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Modal for Success Message */}
        {showModal && (
          <Model
            isOpen={showModal}
            title="KYC Details Submitted!"
            message="Your KYC information has been saved successfully."
            buttonText="Done"
            onClose={() => {
              setShowModal(false);
              navigate("/profile");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default KycDetails;
