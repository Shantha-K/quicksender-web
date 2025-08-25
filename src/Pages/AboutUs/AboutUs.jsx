import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import about from "../../assets/about.png";
import team1 from "../../assets/team1.png";
import team2 from "../../assets/team2.png";
import team3 from "../../assets/team3.png";
import team4 from "../../assets/team4.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Top Section - About Shifter */}
        <section className="bg-gray-100 px-6 py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Text Section */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Shifter: Your Partner in Seamless Logistics
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Shifter, we are dedicated to transforming the way parcels are
                managed and delivered globally. Our innovative solutions empower
                individuals and businesses with efficiency, reliability, and
                unparalleled transparency.
              </p>
            </div>

            {/* Image Section */}
            <div>
              <img
                src={about}
                alt="About Shifter"
                className="rounded-xl  w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Middle Section - Our Story & Purpose */}
        <section className=" px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Our Story & Purpose
          </h2>

          {/* Vision & Mission */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-left">
            {/* Vision */}
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our Vision: To be the leading, most trusted logistics platform,
                setting new standards for efficiency, sustainability, and
                customer satisfaction worldwide. We aim to empower communities
                by making global commerce more accessible and seamless,
                fostering connections across borders.
              </p>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our Mission: To simplify global logistics through innovative
                technology and exceptional service, connecting people and
                businesses with speed and trust. We strive to be the most
                reliable link in the supply chain, ensuring every parcel reaches
                its destination safely and efficiently.
              </p>
            </div>
          </div>

          {/* Company Background */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Company Background
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2015, Shifter began with a simple mission: to
              revolutionize the traditional logistics landscape. Identifying a
              gap in efficient, transparent, and user-friendly parcel
              management, our founders envisioned a platform that would
              streamline delivery processes for everyone, from individual
              senders to large enterprises. Over the years, we've grown from a
              small startup to a global logistics innovator, continuously
              expanding our network and technological capabilities.
            </p>
          </div>
        </section>

        {/* Bottom Section - Meet Our Team */}
        <section className="bg-gray-100 px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Dedicated Team
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Behind every successful parcel delivery and logistics solution at
            Shifter is a team of passionate and experienced professionals. Get
            to know the people who make it all happen.
          </p>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow p-6">
              <img
                src={team1}
                alt="John Doe"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-500">Chief Executive Officer</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow p-6">
              <img
                src={team2}
                alt="Jane Smith"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">Jane Smith</h3>
              <p className="text-gray-500">Chief Technology Officer</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow p-6">
              <img
                src={team3}
                alt="Robert Johnson"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">Robert Johnson</h3>
              <p className="text-gray-500">Head of Operations</p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-xl shadow p-6">
              <img
                src={team4}
                alt="Emily White"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">Emily White</h3>
              <p className="text-gray-500">Head of Customer Success</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
