import logo from "../../assets/shifter.png";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";
import insta from "../../assets/insta.png";
import linkedin from "../../assets/Linkedin.png";

const Footer = () => {
  return (
    <footer
      className="text-white py-8 px-8"
      style={{
        backgroundImage: "linear-gradient(to right, #00C680, #09F8A0)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <img src={logo} alt="Logo" className="h-20 mb-2" />
          <p className="text-sm">
            Effortless Parcel Tracking, Seamless <br />
            Deliveries.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#">Track Package</a>
            </li>
            <li>
              <a href="#">My Orders</a>
            </li>
            <li>
              <a href="#">Support Center</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">+1 (123) 456-7890</p>
          <p className="text-sm">info@shifter.com</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={twitter}
                alt="Twitter"
                className="w-8 h-8 cursor-pointer  transition"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                alt="Facebook"
                className="w-8 h-8 cursor-pointer  transition"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={insta}
                alt="Instagram"
                className="w-8 h-8 cursor-pointer  transition"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-8 h-8 cursor-pointer  transition"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-white mt-6">
        © 2025 Shifter. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
