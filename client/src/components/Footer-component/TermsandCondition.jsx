import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function TermsandCondition() {
    const [openSection, setOpenSection] = useState(null);
    const [activeSection, setActiveSection] = useState(null); 

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const handleSectionClick = (index) => {
        setActiveSection(index); 
    };
    const openEmailWindow = () => {
        window.open("mailto:info@suparcart.com", "_blank", "width=600,height=400");
    };

    return (
        <>
            <section className="py-16">
                {/* Header Section */}
                <div
                    className="bg-[#FFD6D6] flex flex-wrap justify-between p-5 text-md md:text-2xl"
                    style={{ fontFamily: "Inter" }}
                >
                    <h1 className="font-semibold md:px-12 text-xs md:text-lg ">Terms & Conditions</h1>
                    <h2 className="mx-4 text-xs md:text-lg">
                        <span className="font-light">HOME</span> / TERMS & CONDITIONS
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12 py-10">
                    <div className="w-full md:w-1/4 p-4 hidden md:block">
                        <ul className="list-none space-y-4 font-medium md:translate-x-6">
                            {[
                                "1. Acceptance of Terms",
                                "2. Account Registration",
                                "3. Products and Pricing",
                                "4. Orders and Payments",
                                "5. Shipping and Delivery",
                                "6. Returns and Refunds",
                                "7. User Conduct",
                                "8. Intellectual Property",
                                "9. Limitation of Liability",
                                "10. Privacy Policy",
                                "11. Termination",
                                "12. Changes to Terms",
                                "13. Governing Law",
                                "14. Contact Us"
                            ].map((title, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSectionClick(index)}
                                    className={`cursor-pointer ${
                                        activeSection === index ? "text-[#FE6262]" : ""
                                    }`}
                                >
                                    {title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="hidden md:block w-[1px] bg-[#FE6262] translate-y-6"></div>

                    {/* Main Content */}
                    <div className="w-full md:w-3/4 bg-white p-6">
                        <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
                        <p className="text-sm md:text-base text-justify">
                            Effective Date: 04-12-2024
                        </p>
                        <p className="text-sm md:text-base text-justify mt-4 pb-6 md:pb-0">
                            Welcome to Suparcart! These Terms and Conditions govern your use
                            of the website www.suparcart.com (referred to as "Website") and
                            the services provided by Suparcart (referred to as "we," "us," or
                            "our"). By accessing our website, you acknowledge and accept
                            these terms and conditions.
                        </p>
                        {[
                            {
                                title: "1. ACCEPTANCE OF TERMS",
                                content:
                                    "You attest that you are at least 18 years old or that you have your parent's or legal guardian's permission to use the website. If you do not agree with these terms, you are not permitted to use our website."
                            },
                            {
                                title: "2. ACCOUNT REGISTRATION",
                                content:
                                    "It's possible that certain features require registration. It is your duty to keep your account details private. When creating an account, you agree to provide accurate, current, and complete information."
                            },
                            {
                                title: "3. PRODUCTS AND PRICING",
                                content:
                                    "Product availability on the website may change without prior notice. Prices are displayed in [your local currency] and are subject to change without prior notice. While we make every effort to ensure accuracy, we cannot guarantee that all product details, including descriptions, images, and pricing, are completely error-free."
                            },
                            {
                                title: "4. ORDERS AND PAYMENTS",
                                content:
                                    "You commit to buying the goods specified in your order when you place it. It's possible that certain features require registration. It is your duty to keep the information regarding your account private. The methods listed on the website must be used to make payments."
                            },
                            {
                                title: "5. SHIPPING AND DELIVERY",
                                content:
                                    "We aim to process and deliver your order within the specified time frame. On the other hand, unforeseen circumstances might result in delays. If there are any shipping costs, they will be mentioned at the time of purchase."
                            },
                            {
                                title: "6. RETURNS AND REFUNDS",
                                content:
                                    "Our Return and Refund Policy [link to policy] contains comprehensive information. Products eligible for return must meet the conditions specified in the policy."
                            },
                            {
                                title: "7. USER CONDUCT",
                                content:
                                    "You promise not to use the website for illegal activity or in a way that goes against these terms. Prohibited actions include but are not limited to: Transmitting harmful code or content. Misrepresenting your identity. Engaging in unauthorized access or data theft."
                            },
                            {
                                title: "8. INTELLECTUAL PROPERTY",
                                content:
                                    "All content, including text, images, logos, and designs, on Suparcart is our intellectual property or licensed to us. No content may be reproduced, distributed, or used without our express written permission."
                            },
                            {
                                title: "9. LIMITATION OF LIABILITY",
                                content:
                                    "Suparcart is not liable for indirect, incidental, or consequential damages arising from your use of the Website. Our maximum liability for any claim is limited to the amount you paid for the product in question."
                            },
                            {
                                title: "10. PRIVACY POLICY",
                                content:
                                    "Your use of the Website is also governed by our Privacy Policy link to policy, which explains how we collect, use, and protect your data."
                            },
                            {
                                title: "11. TERMINATION",
                                content:
                                    "We reserve the right to terminate your access to the Website if you violate these Terms or engage in activities harmful to Suparcart or its users."
                            },
                            {
                                title: "12. CHANGES OF TERMS",
                                content:
                                    "These terms could be updated at any time. The 'Effective Date' will be updated, and any changes will be advertised on this page. By using the website going forward, you are indicating that you accept the modified Terms."
                            },
                            {
                                title: "13. GOVERNING LAW",
                                content:
                                    "These terms are governed by the laws of Your Jurisdiction. Any disagreements will only be heard by the courts in Kaiser Estate, 3RD Phase Yuen Street, Hung Hom KLN, HONG KONG."
                            },
                            {
                                title: "14. CONTACT US",
                                content: (
                                    <div>
                                        <p>
                                            For any inquiries or worries, please get in touch with us at Email :{" "}
                                            <a
                                                href="mailto:info@suparcart.com"
                                                onClick={(e) => {
                                                    e.preventDefault(); 
                                                    openEmailWindow(); 
                                                }}
                                                className="cursor-pointer"
                                            >
                                                info@suparcart.com
                                            </a>
                                            . Address: Kaiser Estate, 3RD Phase Yuen Street, Hung Hom KLN, HONG KONG.
                                        </p>
                                    </div>
                                )
                            }
                        ].map((section, index) => (
                            <div key={index}>
                                {/* Mobile View Toggle */}
                                <div
                                    className="flex justify-between items-center cursor-pointer py-2 md:hidden"
                                    onClick={() => toggleSection(index)}
                                >
                                    <h2
                                        className={`text-md font-medium text-justify ${
                                            activeSection === index ? "text-[#FE6262]" : ""
                                        }`}
                                    >
                                        {section.title}
                                    </h2>
                                    <span className="text-lg">
                                        {openSection === index ? <FiChevronUp /> : <FiChevronDown />}
                                    </span>
                                </div>
                                {openSection === index && (
                                    <p className="text-sm md:text-base text-justify md:hidden">{section.content}</p>
                                )}
                                {/* Desktop View Content */}
                                <div
                                    className={`mt-6 ${activeSection === index ? "text-[#FE6262]" : ""} hidden md:block`}
                                >
                                    <h2
                                        className={`text-md font-medium text-justify py-2 ${
                                            activeSection === index ? "text-[#FE6262]" : ""
                                        }`}
                                    >
                                        {section.title}
                                    </h2>
                                    <p className="text-sm md:text-base text-justify">{section.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default TermsandCondition;
