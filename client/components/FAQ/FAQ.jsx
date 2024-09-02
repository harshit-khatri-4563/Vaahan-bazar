'use client'
import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return policy for all used cars. If you're not satisfied with your purchase, you can return the car within 7 days for a full refund, provided the car is in the same condition as when it was purchased.",
    },
    {
      question: "How do I schedule a test drive?",
      answer: "You can schedule a test drive by contacting our sales team through our website or by calling us directly. We'll work with you to find a convenient time for your test drive.",
    },
    {
      question: "What financing options are available?",
      answer: "We offer a variety of financing options to suit your needs, including loans through major banks and credit unions. Our finance team will help you find the best rates and terms available.",
    },
    {
      question: "Do you offer warranties on used cars?",
      answer: "Yes, we offer a range of warranty options for our used cars. Our sales team can provide detailed information on the coverage and cost of each warranty option.",
    },
    {
      question: "Can I trade in my current car?",
      answer: "Absolutely! We accept trade-ins and offer competitive trade-in values. Bring your current car to our dealership, and we'll provide an appraisal and offer on the spot.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto p-4">
      <h2 className="text-2xl font-bold  mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div key={index} className="border rounded-lg p-4">
            <button
              className="w-full text-left focus:outline-none"
              onClick={() => handleToggle(index)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.question}</span>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </div>
            </button>
            <div
              className={`transition-max-height duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}
            >
              <div className="mt-2 text-gray-700">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
