import React from 'react'
import Aboutimg from '../../assets/about.png';
import { Shield, Timer, ShieldCheck, Search, Dock } from 'lucide-react';
import Cart from "../../assets/carttt.png";
import { useNavigate } from 'react-router-dom';
import Testimonials from './Testimonial';


function About() {
    const navigate = useNavigate();

    const features = [
        {
            icon: (
                <div className="relative w-12 h-12">
                    <Shield className="w-full h-full" />
                    <Search className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                </div>
            ),
            title: "Security",
            description: "We prioritize the safety of your customers' data, adhering to the latest industry standards."
        },
        {
            icon: <ShieldCheck className="w-12 h-12" />,
            title: "Scalability",
            description: "Our payment solutions ensure data security to industry standards"
        },
        {
            icon: (
                <div className="relative w-12 h-12">
                    <Dock className="w-full h-full bg-[#FFD6D6] rounded-lg shadow-md">
                        <Timer className="absolute bottom-0 right-0 w-6 h-6 top-1/2 text-white" />
                    </Dock>
                </div>
            ),
            title: "24/7 Support",
            description: "Our dedicated support team is available around the clock to assist you with any issues"
        }
    ];
    return (
        <>
            <section className="py-16">
                <div className='bg-[#FFD6D6] flex justify-between p-5 text-md md:text-2xl' style={{ fontFamily: 'Inter' }}>
                    <h1 className='font-semibold md:px-12 text-sm md:text-lg'>About us</h1>
                    <h2 className='mx-4 text-sm md:text-lg'><span className='font-light'>HOME</span>/ ABOUT US</h2>
                </div>
                <div className="relative">
                    <div className="container mx-auto px-4 py-16">
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8">
                            <div className="w-full flex flex-col">
                                <div className="bg-[#FFD6D6] p-6 rounded-lg  flex-grow flex flex-col " >
                                    <h1 className="text-xl md:text-3xl font-bold  border-l-8 border-[#FE6262] pl-2" style={{ fontFamily: 'Poppins' }}> Our Story</h1>
                                    <p className="text-gray-700 max-w-xl py-6 md:text-xl" style={{ fontFamily: 'Inter' }}>
                                        In the rapidly evolving world of e-commerce, having seamless payment solutions is crucial. Our team of payment experts is here to provide you with top-notch services. Whether you're a small online store or a global e-commerce giant, we've got your transactions covered. Trust us with your payments, and focus on growing your business.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute left-1/2 translate-y-96 top-7 md:top-32 transform -translate-x-1/2 md:-translate-y-1/2 z-20">
                                <div className="bg-[#FF6B6B] text-white px-4 py-4 md:py-1 rounded-tl-full rounded-br-full shadow-lg whitespace-nowrap text-md md:text-sm " style={{ fontFamily: 'Inter' }}>
                                    10+ Experience
                                </div>
                            </div>
                            <div className="w-full">
                                <img
                                    src={Aboutimg}
                                    alt="Team collaboration"
                                    className="rounded-lg shadow-xl w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins' }}>Why choose us</h2>
                        <p className="text-gray-600" style={{ fontFamily: 'Inter' }}>Elevate your E-commerce payment experience</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="p-6 border-2 border-[#FF8989] rounded-lg ">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-[#FF8989] flex items-center justify-center transform text-white -translate-y-6 rounded-b-full">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-[#FE6262]">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="py-10">
                <div className="relative w-full flex items-center justify-center">
                    <div className="relative w-full h-full md:h-[500px]">
                        <img
                            src={Cart}
                            alt="Shopping Cart"
                            className="absolute inset-0 w-full h-full object-fill"
                        />

                        <div
                            className="relative z-10 p-8 flex flex-col justify-center h-full lg:ml-20"
                            style={{ fontFamily: "Inter" }}
                        >
                            <h2 className="text-xs font-medium text-white uppercase mb-2">
                                New Season Sale
                            </h2>
                            <h1 className="text-4xl text-black mb-4">
                                <span className="text-white">Upto</span>{" "}
                                <span className="text-black">70% OFF</span>
                            </h1>
                            <p className="text-white mb-6">Don't miss the opportunity</p>
                            <button
                                className="bg-[#D9D9D9] text-[#FE6262] py-2 px-4 rounded-md transition duration-300 w-[160px] md:w-[200px]"
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                    navigate("/shop/home");
                                }}
                            >
                                Shop Collection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Testimonials />
            </div>

        </>
    )
}

export default About