import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const cardData = [
  { id: 1, title: "Card 1", content: "This is the content of card 1" },
  { id: 2, title: "Card 2", content: "This is the content of card 2" },
  { id: 3, title: "Card 3", content: "This is the content of card 3" },
  { id: 4, title: "Card 4", content: "This is the content of card 4" },
  { id: 5, title: "Card 5", content: "This is the content of card 5" },
  { id: 6, title: "Card 6", content: "This is the content of card 6" },
  { id: 7, title: "Card 7", content: "This is the content of card 7" },
  { id: 8, title: "Card 8", content: "This is the content of card 8" }
];

const TopRestaurants = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + cardsPerPage < cardData.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  return (
    <div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Top Restaurants</h2>
        <div className="relative p-8 max-w-5xl mx-auto border rounded-lg shadow-lg bg-gradient-to-r from-white-50 to-white-100">
                {/* Arrows */}
            <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                onClick={handlePrev} 
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
                disabled={currentIndex === 0}
                >
                <FaArrowLeft />
                </button>
                <button 
                onClick={handleNext} 
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
                disabled={currentIndex + cardsPerPage >= cardData.length}
                >
                <FaArrowRight />
                </button>
            </div>

                {/* Card Container */}
            <div className="flex space-x-6 overflow-hidden">
                {cardData.slice(currentIndex, currentIndex + cardsPerPage).map((card) => (
                <div 
                    key={card.id} 
                    className="w-1/4 bg-white p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">{card.title}</h3>
                    <p className="text-gray-600">{card.content}</p>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default TopRestaurants;
