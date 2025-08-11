import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";

const TermsConditions = () => {
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
          <div className="mx-auto p-8 rounded-xl shadow bg-white max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Terms & Conditions
            </h1>
            <p className="mb-6 text-gray-700">
              Welcome to Shifter. By accessing or using our website, mobile app,
              or services, you agree to comply with and be bound by the
              following Terms & Conditions. Please read them carefully before
              using Shifter.
            </p>

            {/* 1. Acceptance of Terms */}
            <h2 className="text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="mb-6 text-gray-700">
              By using Shifter’s website or services, you agree to these Terms &
              Conditions and our Privacy Policy. If you do not agree, please do
              not use our services.
            </p>

            {/* 2. Services Provided */}
            <h2 className="text-xl font-semibold mb-2">2. Services Provided</h2>
            <p className="mb-6 text-gray-700">
              Shifter is a delivery service platform that enables customers to
              send packages from one location to another through registered
              delivery partners. We may update, modify, or discontinue our
              services at any time without prior notice.
            </p>

            {/* 3. User Responsibilities */}
            <h2 className="text-xl font-semibold mb-2">
              3. User Responsibilities
            </h2>
            <ul className="list-decimal list-inside mb-6 text-gray-700 space-y-2">
              <li>
                You must provide accurate and complete information when booking
                a delivery.
              </li>
              <li>
                You are responsible for ensuring that your items are properly
                packaged.
              </li>
              <li>
                You must not send prohibited, illegal, or dangerous goods (e.g.,
                explosives, weapons, perishable goods without proper handling).
              </li>
              <li>
                You agree to comply with all applicable laws when using our
                services.
              </li>
            </ul>

            {/* 4. Delivery and Timelines */}
            <h2 className="text-xl font-semibold mb-2">
              4. Delivery and Timelines
            </h2>
            <ul className="list-decimal list-inside mb-6 text-gray-700 space-y-2">
              <li>
                Delivery times are estimates and may vary due to traffic,
                weather, or other factors.
              </li>
              <li>Shifter is not liable for delays beyond our control.</li>
              <li>
                In case of failed delivery attempts due to incorrect address or
                unavailability of recipient, re-delivery charges may apply.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
