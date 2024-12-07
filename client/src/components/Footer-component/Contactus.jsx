import React, { useState } from 'react';
import Contactimg from '../../assets/contactus.png';
import axios from 'axios'; // Import axios

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request to the backend API
      const response = await axios.post('https://ecommerce-d1.onrender.com/api/common/contact-us', formData);
      
      // Handle success
      if (response.status === 200) {
        console.log('Form submitted successfully:', response.data);
        // Optionally, show a success message or reset the form
        setFormData({
          email: '',
          name: '',
          message: ''
        });
        alert('Your message has been sent successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <section className="py-16">
        <div className='bg-[#FFD6D6] flex justify-between p-5 text-md md:text-2xl' style={{ fontFamily: 'Inter' }}>
          <h1 className='font-semibold md:px-12 text-sm md:text-lg'>Contact Us</h1>
          <h2 className='mx-4 text-sm md:text-lg'><span className='font-light'>HOME</span>/ CONTACT US</h2>
        </div>
      </section>
      <div className="bg-[#FFD6D6] mx-4 md:mx-auto md:container rounded-md mb-4">
        <div className="container mx-auto px-4 py-12 ">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-medium mb-4" style={{ fontFamily: 'Inter' }}>
                  "We're Here to Help!
                  <span className="block">
                    <span className="text-[#FE6262]">Contact Us</span> Anytime."
                  </span>
                </h2>
                <div className="relative w-full max-w-md mx-auto md:mx-0 lg:translate-y-20 lg:-translate-x-24">
                  <img
                    src={Contactimg}
                    alt="Contact illustration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-1/2 p-8">
              <h3 className="text-2xl  mb-6 text-center" style={{ fontFamily: 'Inter' }}>Get In Touch!</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-full border border-black bg-[#FFD6D6]"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-full border border-black bg-[#FFD6D6]"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-black  bg-[#FFD6D6]"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full md:w-[100px] bg-[#FE6262] text-white py-3 px-6 rounded-full"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
