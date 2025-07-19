import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Footer = () => {
  const socialLinks = [
    {
      url: "https://www.instagram.com/dwivedi_prakash1410/",
      icon: "ri-instagram-line",
      label: "Instagram",
    },
    {
      url: "https://github.com/Dwivedi1410",
      icon: "ri-github-fill",
      label: "GitHub",
    },
    {
      url: "/getInTouch",  // Internal route
      icon: "ri-mail-line",
      label: "Email",
      isInternal: true
    }
  ];

  return (
    <div className="py-6 bg-[#E82561] mt-6 -mx-4">
      <div className="flex space-x-4 justify-center">
        {socialLinks.map((link, index) => (
          link.isInternal ? (
            <Link
              key={index}
              to={link.url}
              aria-label={link.label}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <i className={`${link.icon} text-4xl cursor-pointer`} />
            </Link>
          ) : (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <i className={`${link.icon} text-4xl cursor-pointer`} />
            </a>
          )
        ))}
      </div>
      <div className="text-white font-semibold text-center mt-2">
        Made by Prakash Dwivedi (2025)
      </div>
    </div>
  );
};

export default Footer;