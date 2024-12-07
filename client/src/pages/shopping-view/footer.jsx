import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { GrLocationPin } from "react-icons/gr";
import { PiPhoneCallLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { shoppingViewHeaderMenuItems } from "@/config";
import { FiInstagram } from "react-icons/fi";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; 
import Logo from '/cartfoo.png';


const Footer = () => {
  const [isCompanyOpen, setCompanyOpen] = useState(false);
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleNavigate = (category) => {
    sessionStorage.removeItem("filters");
    const currentFilter = category ? { category: [category] } : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter) {
      setSearchParams(new URLSearchParams(`?category=${category}`));
    } else {
      navigate(`/shop/listing?category=${category}`);
    }
    scrollToTop();
  };

  return (
    <>
      <footer className="bg-[#2D2D2D] text-white py-6 md:mt-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around">
            <div className="flex flex-col w-full justify-start md:w-1/4 p-2">
              <img src={Logo} alt="Logo" className="h-20 w-20 md:h-[100px] md:w-[100px]  md:translate-x-20 pb-2" />
              {/* <HousePlug className="h-6 w-6 md:h-[100px] md:w-[80px]" /> */}
              <p className="text-gray-300 mb-2 text-justify">
              Suparcart is crafted to provide a smooth and intuitive shopping experience for customers in search of premium products at great prices. With a thoughtfully curated collection, our mission is to offer a wide array of items that align with the tastes and needs of our diverse audience.
              </p>
            </div>

            {/* Company Section */}
            <div className="flex flex-col p-2 w-full md:w-auto">
      <div
        className="flex justify-between items-center cursor-pointer md:cursor-auto"
        onClick={() => setCompanyOpen(!isCompanyOpen)}
      >
        <h3 className="text-white font-medium mb-2 text-xl">Suparcart</h3>
        <span className="md:hidden">
          {isCompanyOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      <ul
        className={`text-gray-300 md:block ${isCompanyOpen ? 'block' : 'hidden'}`}
      >
        {[
          { name: 'About Us', path: '/about' },
          { name: 'Contact Us', path: '/contact' },
          { name: 'Privacy Policy', path: '/privacy' },
          { name: 'Terms & Conditions', path: '/terms&condition' },
        ].map(({ name, path }) => (
          <li className="mt-1" key={name}>
            <Link
              to={path} // Use the page path here
              className="hover:text-teal-400"
              onClick={scrollToTop} // Optionally, scroll to top when navigating
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>

            {/* Products Section */}
            <div className="flex flex-col p-2 w-full md:w-auto">
              <div
                className="flex justify-between items-center cursor-pointer md:cursor-auto"
                onClick={() => setProductsOpen(!isProductsOpen)}
              >
                <h3 className="text-white font-medium mb-2 text-xl">
                  Products
                </h3>
                {/* Show arrow only in mobile view */}
                <span className="md:hidden">
                  {isProductsOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>
              <ul
                className={`text-gray-300 md:block ${
                  isProductsOpen ? "block" : "hidden"
                }`}
              >
                {shoppingViewHeaderMenuItems
                  .filter((item) =>
                    [
                      "men",
                      "women",
                      "kids",
                      "footwear",
                      "accessories",
                    ].includes(item.id)
                  )
                  .map((product) => (
                    <li className="mt-1" key={product.id}>
                      <span
                        className="cursor-pointer hover:text-teal-400"
                        onClick={() => handleNavigate(product.id)}
                      >
                        {product.label.charAt(0).toUpperCase() +
                          product.label.slice(1).toLowerCase()}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col p-2 w-full md:w-auto">
              <div
                className="flex justify-between items-center cursor-pointer md:cursor-auto"
                onClick={() => setContactOpen(!isContactOpen)}
              >
                <h3 className="text-white font-bold mb-2">Contact</h3>
                <span className="md:hidden">
                  {isContactOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>
              <ul
                className={`text-gray-300 md:block ${
                  isContactOpen ? "block" : "hidden"
                }`}
              >
                <li className="flex items-center mt-1">
                  <GrLocationPin className="text-blue-200" size={20} />
                  <span className="md:ml-2 ml-1">Kaiser Estate, 3RD Phase Yuen Street, <br/>Hung Hom KLN,HONG KONG</span>
                </li>
                <li className="flex items-center mt-3">
                  <PiPhoneCallLight className="text-blue-200" size={20} />
                  <span className="md:ml-2 ml-1">
    <a href="tel:+17075541674" className="cursor-pointer">7075541674</a>
</span>
                </li>
                <li className="flex items-center mt-3">
                  <CiMail className="text-blue-200" size={20} />
                  <span className="md:ml-2 ml-1">
    <a href="mailto:info@suparcart.com" className="cursor-pointer">info@suparcart.com</a>
</span>
                </li>
              </ul>

              {/* Social Media Section */}
              <div className="flex justify-center md:justify-evenly mt-4">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3b5998]"
                >
                  <RiFacebookCircleFill size={28} />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1da1f2]"
                >
                  <FaXTwitter size={28} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-[#E1306C]"
                >
                  <FiInstagram size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-center items-center text-center">
          <p className="text-gray-300 text-sm">
            © Suparcart, All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
