import React, { useEffect, useState } from "react";

const OrderHistoryMobile = ({ closeModal }) => {
  const [history, setHistory] = useState({});
  const [activeTable, setActiveTable] = useState(null); // Track the active table

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("orderHistory")) || {};
    setHistory(storedHistory);
  }, []);
  const toggleTable = (table) => {
    // Toggle the table's active state
    setActiveTable((prev) => (prev === table ? null : table));
  };
  // Sort tables by the earliest order
  // Sort tables based on the latest order's timestamp
  const sortedHistory = Object.entries(history).sort(([tableA, ordersA], [tableB, ordersB]) => {
    // Get the latest order's timestamp for each table
    const latestA = ordersA.length > 0 ? new Date(ordersA[ordersA.length - 1].timestamp) : new Date(0);
    const latestB = ordersB.length > 0 ? new Date(ordersB[ordersB.length - 1].timestamp) : new Date(0);

    // Sort by latest order timestamp (most recent first)
    return latestB - latestA;
  });
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full h-full max-w-md overflow-y-auto rounded-lg shadow-lg p-6">
        {/* Close Button to close the modal */}
        <button
          onClick={closeModal}
          className="absolute top-10 right-10 text-gray-600 text-4xl font-bold"
        >
          &times; {/* Close icon */}
        </button>

        <img src="/hanabi.jpg" className="h-12 w-auto mt-5" />

        {/* Render order history */}
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold mb-2">Bestellverlauf</h2>
          {sortedHistory.map(([table, orders]) => (
            <div
              key={table}
              className="bg-white border border-gray-300 rounded-lg shadow p-3"
            >
              <button
                onClick={() => toggleTable(table)}
                className="flex items-center justify-between w-full text-left font-semibold text-blue-700"
              >
                <span>{`Tisch ${table}`}</span>
                <div className="text-xs text-gray-500">
                  🕒{" "}
                  {new Date(
                    orders[orders.length - 1].timestamp
                  ).toLocaleString()}
                </div>
              </button>

              {/* Show the orders only for the active table */}
              {activeTable === table && (
                <div className="mt-2 space-y-3 text-sm text-gray-700">
                  {orders.map((order, index) => (
                    <div key={index} className="border-t pt-2">
                      <ul className="list-disc pl-4">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} — {item.price.toFixed(2)}€
                          </li>
                        ))}
                      </ul>
                      {order.note && (
                        <div className="mt-1 italic text-gray-500">
                          📝 {order.note}
                        </div>
                      )}
                    </div>
                  ))}
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
