import NavBar from "../../Components/NavBar/NavBar";
import SideBar from "../../Components/Sidebar/Sidebar";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="mb-6 text-gray-700">
              Shifter values your privacy and is committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, store, and protect your data when you use our website, mobile
              app, or services.
            </p>

            {/* 1. Information We Collect */}
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-6 text-gray-700">
              At Shifter, we respect your privacy and are committed to
              protecting your personal information. When you use our website,
              mobile app, or delivery services, we may collect details such as
              your name, phone number, email address, pickup and drop-off
              locations, and package information, along with technical data like
              your device type, browser, and IP address. This information is
              used solely to provide and improve our services, process and
              deliver your orders, communicate with you about bookings and
              updates, enhance your user experience, and ensure the security of
              our platform.
            </p>

            {/* 2. Sharing and Protection */}
            <h2 className="text-xl font-semibold mb-2">
              2. Sharing and Protection of Your Data
            </h2>
            <p className="mb-6 text-gray-700">
              We may share necessary details with trusted delivery partners,
              payment processors, or legal authorities if required by law, but
              we will never sell or rent your personal data to third parties.
              Your information is safeguarded using industry-standard security
              measures, including encryption, and is accessed only by authorized
              personnel. While we take all reasonable steps to protect your
              data, no method of transmission over the internet is entirely
              secure.
            </p>

            {/* 3. Cookies, Consent, Updates */}
            <h2 className="text-xl font-semibold mb-2">
              3. Cookies, Consent, and Policy Updates
            </h2>
            <p className="mb-6 text-gray-700">
              Cookies may be used on our website or app to remember your
              preferences, analyze traffic, and improve service quality; you can
              choose to disable them in your browser settings, though some
              features may not work as intended. By using Shifter, you consent
              to the collection and use of your information as outlined in this
              Privacy Policy. We may update this policy from time to time, and
              any changes will be posted on this page with a revised effective
              date. For any questions, concerns, or requests regarding your
              data, please contact us at{" "}
              <a
                href="mailto:privacy@shifter.com"
                className="text-emerald-600 underline"
              >
                privacy@shifter.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
