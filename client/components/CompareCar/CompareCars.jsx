import React from "react";
import CarComparisonCard from "../CarComparisonCard";

const carComparisons = [
  {
    car1: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
    car2: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
  },
  {
    car1: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
    car2: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
  },
  {
    car1: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
    car2: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
  },
  {
    car1: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
    car2: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
  },
  {
    car1: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
    car2: {
      name: "Tata Punch",
      price: "Rs. 10 LPA",
      image: "/tata_punch_image.jpeg",
    },
  },

  // Add more comparison objects as needed
];

const CompareCars = () => {
  return (
    <div className="p-5 ">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Compare Cars</h1>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  place-content-center">
        {carComparisons.map((comparison, index) => (
          <CarComparisonCard
            key={index}
            car1={comparison.car1}
            car2={comparison.car2}
          />
        ))}
      </div>
      <div className="mt-5">
        <p className="text-sm font-medium text-blue-500">
          Compare Cars of Your Choice
        </p>
      </div>
    </div>
  );
};

export default CompareCars;
