import { useState, useRef, useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  tableName,
  orderItems,
  setOrderItems,
  setTables,
  addOrderItem,
  removeOrderItem,
  dishes,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDishes, setShowDishes] = useState(false); // To control the visibility of the filtered dishes
  const modalRef = useRef(null); // Reference for the modal
  const searchWrapperRef = useRef(null); // Reference for the search wrapper
  const [note, setNote] = useState(localStorage.getItem(tableName) || "");
  // Calculate the total
  const calculateTotal = () => {
    return parseFloat(
      orderItems.reduce((total, item) => total + item.price, 0).toFixed(2)
    );
  };

  // Filter dishes based on the search query
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDishes(true); // Show dishes when the user starts typing
  };

  // Close the dropdown if clicking outside the search bar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setShowDishes(false); // Hide the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Handle double-click on an order item
  const [clickTimer, setClickTimer] = useState(null); // Timer to handle double click
  const handleItemClick = (index) => {
    if (clickTimer) {
      clearTimeout(clickTimer); // Clear the previous timeout
      setClickTimer(null); // Reset the timer
      // Remove item if double clicked
      removeOrderItem(index);
    } else {
      const newTimer = setTimeout(() => {
        setClickTimer(null); // Reset the timer after the timeout
      }, 300); // 300ms to detect double click
      setClickTimer(newTimer);
    }
  };
  // Handle the "Pay" button click
  const handlePay = () => {
    if (!tableName) {
      console.error("Table name is undefined!");
      return;
    }

    // Get current time
    const timestamp = new Date().toISOString();

    // Retrieve current data from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || {};
    const allEntries = JSON.parse(localStorage.getItem("entries")) || [];
    // Check if storedOrders for the given table is empty
    if (Object.keys(storedOrders[tableName] || {}).length > 0) {
      // If storedOrders is not empty, create a new entry and push to allEntries
      const newEntry = {
        tableName: tableName,
        timestamp: timestamp,
        storedOrders: storedOrders[tableName] || {}, // store orders for that table
      };
      allEntries.push(newEntry); // Add new entry to history

      // Save back to localStorage
      localStorage.setItem("entries", JSON.stringify(allEntries));
    }

    // Optional: Log it to check

    // Remove order + note from active lists
    delete storedOrders[tableName];
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    // Reset state
    setOrderItems([]);
    setNote("");

    // Handle Abholung table removal
    if (tableName.includes("Abholung")) {
      setTables((prevTables) => {
        const updatedTables = prevTables.filter((table) => table !== tableName);
        localStorage.setItem("tables", JSON.stringify(updatedTables));
        return updatedTables;
      });
    }

    // Close modal
    onClose();
  };

  // Retrieve the stored note for this specific table from localStorage or use an empty string if no note is found

  useEffect(() => {
    if (tableName) {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
      setNote(storedNotes[tableName] || ""); // Load the note for the selected table
    }
  }, [tableName]); // Runs when a new table is opened

  useEffect(() => {
    if (tableName) {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || {}; // Get all notes
      if (note.trim() === "") {
        delete storedNotes[tableName]; // Remove note if empty
      } else {
        storedNotes[tableName] = note; // Save note for the table
      }
      localStorage.setItem("notes", JSON.stringify(storedNotes));
    }
  }, [note, tableName]);

  return (
    isOpen && (
      <div className="text-xl fixed inset-0 bg-gray-400 bg-opacity-50 flex justify-center items-center z-50">
        <div
          ref={modalRef}
          className="bg-white p-6 rounded-lg w-full h-full sm:max-w-md sm:max-h-screen overflow-y-auto"
        >
          <img src="/hanabi.jpg" className="h-12 w-auto mt-5" />
          {/* Close button (X) */}
          <button
            onClick={() => {
              onClose();
            }}
            className="absolute mt-21 mr-5 top-2 right-2 text-3xl font-bold text-black hover:text-gray-700 bg-white px-1.5 py-0.5 rounded-sm"
          >
            X
          </button>

          <h2 className="text-2xl font-bold mb-4 mt-1">Tisch {tableName}</h2>

          {/* Search Bar */}
          <div className="mb-4 relative" ref={searchWrapperRef}>
            <input
              type="text"
              placeholder="Suchen..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {/* Display filtered dishes only if showDishes is true */}
            {showDishes && searchQuery && filteredDishes.length > 0 && (
              <div className="absolute left-0 right-0 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded mt-1 z-10">
                {filteredDishes.map((dish, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      addOrderItem(dish.name, dish.price); // Add the item to the order
                      setShowDishes(false); // Close the dropdown
                      setSearchQuery(""); // Clear the search query
                    }}
                  >
                    <span>{dish.name}</span>
                    <span>{dish.price}€</span>
                  </div>
                ))}
              </div>
            )}

            {/* If no dishes match the search query, display a "No results" message */}
            {showDishes && searchQuery && filteredDishes.length === 0 && (
              <div className="absolute left-0 right-0 p-2 text-center text-gray-500">
                No results found
              </div>
            )}
          </div>

          {/* Note Box */}
          <div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)} // Update the note as the user types
              rows="1" // Only 1 line
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Note ..."
            ></textarea>
          </div>

          {/* Order Items */}
          <div className="mt-2 p-2 border border-gray-300 rounded-lg shadow-lg bg-white">
            {orderItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 cursor-pointer border-b last:border-0 hover:bg-gray-100"
                onClick={() => handleItemClick(index)} // Handle double-click to remove item
              >
                <span className="font-semibold">{item.name}</span>
                <span className="font-semibold">{item.price}€</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 font-bold bg-blue-300 w-full rounded-lg p-4">
            Insgesamt:
            <span className="text-2xl ml-20">{calculateTotal()}€</span>
          </div>

          {/* Pay Button */}
          <div className="bg-zinc-900 mt-6">
            <button
              onClick={handlePay}
              className="bg-black font-bold text-white text-2xl py-2 px-4 rounded-xl w-full"
            >
              Bezahlen
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
