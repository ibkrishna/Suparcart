import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "E-commerce Owner",
      comment: "Shopping at Suparcart was a breeze! Quick delivery, top-notch products, and excellent customer service. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Michael Chen",
      role: "Online Retailer",
      comment: "Suparcart offers an amazing variety of products. Easy checkout, fast shipping, and responsive customer support. Truly exceptional!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Emma Davis",
      role: "Digital Marketing Manager",
      comment: "Wonderful shopping experience with Suparcart. Great product quality, user-friendly interface, and prompt delivery. Will definitely shop here again!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div className="py-10 bg-[#FFD6D6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl" style={{fontFamily:'Poppins'}}>
            Our happy <span className="text-[#FF543E]">customers</span>
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2"
          >
            <ChevronLeft className="md:w-8 md:h-8" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10  p-2"
          >
            <ChevronRight className="md:w-8 md:h-8" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="flex flex-col items-center p-6 mx-4">
                    <div className="w-24 h-24 mb-6 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center max-w-xl">
                      <p className="text-gray-800 mb-4 text-xl" style={{fontFamily:'Manrope'}}>"{testimonial.comment}"</p>
                      <div className="flex justify-center gap-1 mb-2">
                        {renderStars(testimonial.rating)}
                      </div>
                      {/* <h4 className="font-semibold text-gray-900">{testimonial.name}</h4> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          {/* <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-pink-500' : 'bg-pink-200'
                }`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;