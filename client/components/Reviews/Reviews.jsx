import React from 'react';

const testimonials = [
  {
    name: 'Rovert Harvest',
    text: 'We have been using Rental for my car rental needs for several years now and have always been happy with their service. Their customer support is exceptionally serviced and they are always available to help with any issues we have. The prices are also very competitive.',
    image: '/review1.webp',
  },
  {
    name: 'Jovan Reels',
    text: 'I have been using Rental for my car rental needs for over 5 years now. I have never had any problems with their service. Their customer support is always responsive and helpful. I would recommend Rental to anyone looking for a reliable car rental provider.',
    image: '/review2.webp',
  },
  {
    name: 'Kanesha Keyton',
    text: 'Endorsed by industry experts, Rental is the car rental solution you can trust. With years of experience in the field, we provide fast, reliable, and secure car rental services.',
    image: '/review3.webp',
  },
];

const Reviews = () => {
  return (
    <section className="py-12 bg-gray-100">
    <div className="mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-center mb-14">What Our Customers Are Saying...</h2>
      <div className="flex flex-wrap -mx-4 justify-center ">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-[400px] md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full object-cover " 
              />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <p className="text-lg font-semibold mb-4">{testimonial.text}</p>
                <p className="text-sm font-bold text-gray-600">{testimonial.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Reviews;
