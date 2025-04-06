import React, { useEffect, useState } from "react";

const OrderHistoryMobile = ({ closeModal }) => {
  const [history, setHistory] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track active index

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("entries")) || [];
    setHistory(storedHistory);
  }, []);

  const toggleEntry = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full h-full max-w-md overflow-y-auto rounded-lg shadow-lg p-4 relative sm:rounded-none">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-10 right-10 text-gray-600 text-4xl font-bold"
        >
          &times;
        </button>

        <img
          src="/hanabi.jpg"
          alt="Logo"
          className="h-12 w-auto mt-5 mx-auto"
        />

        <h2 className="text-xl font-bold mb-4 text-center mt-4">
          Bestellverlauf
        </h2>

        <div className="space-y-4">
          {[...history].reverse().map((entry, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow p-3"
            >
              <button
                onClick={() => toggleEntry(index)}
                className="text-xl flex items-center justify-between w-full font-semibold text-blue-700"
              >
                <span>{`Tisch ${entry.tableName}`}</span>
                <span className="text-xl text-gray-500">
                  🕒{" "}
                  {new Date(entry.timestamp).toLocaleString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Optional: 24-hour format
                  })}
                </span>
              </button>

              {activeIndex === index && (
                <div className="mt-2 space-y-2 text-sm text-gray-700 border-t pt-2">
                  <ul className="list-disc pl-4">
                    {entry.storedOrders.map((item, idx) => (
                      <li key={idx}>
                        {item.name} — {item.price.toFixed(2)}€
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryMobile;
