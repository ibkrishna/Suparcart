import React from "react";
import Privacyimg from '../../assets/privacy.png';

function Privacy() {
  return (
    <>
      <section className="py-16">
        <div
          className="bg-[#FFD6D6] flex flex-wrap justify-between p-5 text-md md:text-2xl"
          style={{ fontFamily: "Inter" }}
        >
          <h1 className="font-semibold md:px-12 text-sm md:text-lg">Privacy Policy</h1>
          <h2 className="mx-4 text-sm md:text-lg">
            <span className="font-light">HOME</span> / PRIVACY POLICY
          </h2>
        </div>
      </section>
      <div className="mx-4 md:mx-auto md:container rounded-md mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8">
            <h1 className="text-xl md:text-2xl font-semibold" style={{ fontFamily: "Inter" }}>
              Suparcart Privacy Policy
            </h1>
            <p className="text-lg" style={{ fontFamily: "Inter" }}>
              We at Suparcart respect and are dedicated to safeguarding your privacy. Our e-commerce
              website, www.suparcart.com (the "Site"), collects, uses, discloses, and protects your
              information as outlined in this Privacy Policy. By accessing and using our website,
              you consent to the information being collected and used as outlined in this policy.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-red-500 border-l-4 border-red-500 pl-2 mb-4">
                Information we Gather
              </h2>
              <ul className="list-none space-y-4 md:text-xl" style={{ fontFamily: "Inter" }}>
                <li>How We Utilize Your Data</li>
                <li>Cookies</li>
                <li>Rights to Privacy</li>
                <li>Privacy of Children</li>
                <li>Modifications to this Privacy Statement</li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={Privacyimg}
                alt="Privacyimg"
                className="w-full max-w-sm "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 md:mx-auto md:container rounded-md mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col border border-black">
            <div className="p-6 flex flex-col">
                <h1 className="text-[#FE6262] md:text-xl font-medium pb-4 " style={{fontFamily:'Inter'}}>INFORMATION WE GATHER</h1>
                <ul className="list-none space-y-2 text-lg" style={{ fontFamily: "Inter" }}>
                <li>We gather information from your interactions with our website, both personal and non-personal:</li>
                <li>Private Data: You give us this information and customer details when you register for an account, place an </li>
                <li>Order, or go to an event.</li>
                <li>Among them are:</li>
                <li>Name</li>
                <li>Details of contact (phone, email)</li>
                <li>Billing and shipping address</li>
                <li>Details of the payment (debit card, credit card, etc.)</li>
                <li>Information that is not personal: This  data gathered when you visit our website, which enhances your</li>
                <li>experience without identifying you individually. It consists of:</li>
                <li>IP address</li>
                <li>Device or browser type</li>
                <li>Time spent on the site and pages viewed</li>
                <li>Cookies are used to monitor usage trends and preferences.</li>
              </ul>
            </div> 
            <div className="p-6 flex flex-col">
                <h1 className="text-[#FE6262] md:text-xl font-medium pb-4 " style={{fontFamily:'Inter'}}>HOW WE UTILIZE YOUR DATA</h1>
                <ul className="list-none space-y-2 text-lg" style={{ fontFamily: "Inter" }}>
                <li>We utilize the following information about you:</li>
                <li>Handle and complete your order</li>
                <li>Boost our website's usability and functionality</li>
                <li>Communicate with you, for example, by sending you promotional materials or updates (if you register).</li>
                <li>To secure your account, avoid fraud and take precautions.</li>
                <li>To improve your information, publish the website.</li>
              </ul>
            </div> 
            <div className="p-6 flex flex-col">
                <h1 className="text-[#FE6262] md:text-xl font-medium pb-4 " style={{fontFamily:'Inter'}}>COOKIES</h1>
                <ul className="list-none space-y-2 text-lg" style={{ fontFamily: "Inter" }}>
                <li>Let us keep track of your preferences, including your shopping cart and login information, and analyze </li>
                <li>User behavior on the website to in order to enhance its functionality. your interaction with our website. </li>
                <li>Data Protection We are dedicated to taking the highest precautions to protect your personal </li>
                <li>Information. We protect your data with industry-standard security standards. No mode of transmission</li>
                <li>Over the Internet is 100% secure, even though we take precautions to protect your information, </li>
                <li>Including using encryption and secure servers. We are unable to provide complete protection. Give</li>
                <li>Your details.</li>
                <li>Your personal information won't be traded, rented, or given to any parties. Nonetheless, we might give</li>
                <li>Your information to reputable service providers who assist us with:</li>
                <li>Remittance</li>
                <li>Order shipping</li>
                <li>Obtain a webpage</li>
                <li>
                Support for data analysis or marketing and only use it for what they originally intended. Connections to</li>
                <li>Other Websites.</li>
                <li>There may be links on our website to other websites. We apologize, but we have no control over the</li>
                <li>Privacy policies of other websites. Before entering any personal information on any third-party website,</li>
                <li>We advise you to read the privacy statement.</li>
              </ul>
            </div> 
            <div className="p-6 flex flex-col">
                <h1 className="text-[#FE6262] md:text-xl font-medium pb-4 " style={{fontFamily:'Inter'}}>RIGHTS TO PRIVACY</h1>
                <ul className="list-none space-y-2 text-lg" style={{ fontFamily: "Inter" }}>
                <li>Nonetheless, you can be entitled to the following rights based on your laws:</li>
                <li>View or amend your personal data</li>
                <li>If relevant, kindly remove your information</li>
                <li>
                Choose not to receive marketing emails To implement this policy, please get in touch with us using</li>
                <li>The details provided below. </li>
              </ul>
            </div> 
            <div className="p-6 flex flex-col">
                <h1 className="text-[#FE6262] md:text-xl font-medium pb-4 " style={{fontFamily:'Inter'}}>PRIVACY OF CHILDREN</h1>
                <ul className="list-none space-y-2 text-lg" style={{ fontFamily: "Inter" }}>
                <li>People under the age of eighteen are not the target audience for our website, and we do not gather </li>
                <li>Personal data from</li>
                <li>
                This segment The following clauses apply to the third parties: to abide by agreements to guarantee </li>
                <li>That your data is protected kids. If we find that we have gathered personal data about someone who is </li>
                <li>Younger than eighteen, we will take action to remove that data. </li>
              </ul>
            </div> 
            <div className="p-6 flex flex-col">
                <h1 className="text-[#FE6262] md:text-xl font-medium pb-4 " style={{fontFamily:'Inter'}}>MODIFICATIONS TO THE PRIVACY STATEMENT</h1>
                <ul className="list-none space-y-2 text-lg" style={{ fontFamily: "Inter" }}>
                <li>On occasion, we might make changes to this privacy statement. This page will be updated to reflect </li>
                <li>Any changes, and the "Effective Date" at the top will be modified appropriately. Please visit this page </li>
                <li>For updates on a regular basis. Reach Out to Us</li>
                <li>Please feel free to contact us at: if you have any queries or worries about our privacy statement or how</li>
                <li>We manage your data.</li>
              </ul>
            </div> 
            <div className="p-6 flex flex-col">
                <h1 className="md:text-xl font-medium pb-4 " style={{fontFamily:'Inter'}}>Suparcart</h1>
                <ul className="list-none space-y-2 text-lg" style={{ fontFamily: "Inter" }}>
                <li>Email: <a href="mailto:futureteq15@gmail.com">futureteq15@gmail.com</a></li>
                <li>Phone: <a href="tel:+85251662143">85251662143</a></li>
                <li>Kaiser Estate, 3RD Phase Yuen Street,</li>
                <li>Hung Hom KLN,HONG KONG is the address.</li>
                <li>The Administrative Law's practices are acknowledged and accepted by</li>
                <li>You by utilizing our site.</li>
              </ul>
            </div> 
          </div>
         </div>
      </div>
    </>
  );
}

export default Privacy;
