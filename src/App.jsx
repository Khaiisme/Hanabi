import { useState, useEffect } from "react";
import Table from "./components/Table";
import Modal from "./components/Modal";

// Sample dish data (name and price)
const dishes = [
  { name: "01.Pekin-Gulasch-Suppe", price: 3.90 },
  { name: "02a.GemüseSuppe Tofu", price:  3.50},
  { name: "02b.GemüseSuppe Hühner", price: 3.50 },
  { name: "02c.GemüseSuppe Vantan", price: 4.50 },
  { name: "03.Catch The Fish Suppe", price: 7.50 },
  { name: "04a.Sommer Rolle Tofu", price: 3.90 },
  { name: "04b.Sommer Rolle Hühner", price: 5.50 },
  { name: "04c.Sommer Rolle Garnelen", price: 6.50 },
  { name: "04d.Sommer Rolle Lachs", price: 6.50 },
  { name: "05.Spring Rolls", price:4.90 },
  { name: "06.EDAMAME", price: 4.90 },
  { name: "07a.GYOZA YAKI", price: 4.90 },
  { name: "07a.GYOZA gedämpfte", price: 4.90 },
  { name: "08.Kokos-Milch-Suppe", price: 4.50 },
  { name: "09a.Chuka Salat Seetang", price: 5.50 },
  { name: "09b.Chuka Salat Avocado", price: 5.90 },
  { name: "09c.Chuka Salat Lachs", price: 6.90},
  { name: "09d.ChukaSalat Jakobsmuscheln ", price: 7.50},
  { name: "10.Vege Frühlingsrolle", price: 3.50 },
  { name: "11.Teriyaki ", price: 6.90 },
  { name: "12.Ha Cao", price: 5.50 },
  { name: "13.Ebi Tempura", price: 6.90 },
  { name: "14.Gemischter Salat", price: 3.90 },
  { name: "15.Gemischter Salat Hühner", price: 4.90 },
  { name: "16a.Green Love Tapas", price: 14.50 },
  { name: "16b.Green Love Tapas", price: 22 },

  { name: "T1. Crunchy Veggie", price: 13.50 },
  { name: "T2. Crunchy Tori", price: 14 },
  { name: "T3. Tunacado", price: 14.90 },
  { name: "T4. Crunchy Salmon", price: 14.00 },
  { name: "T6. Double Bubble Crunchy", price: 15 },
  { name: "T7. Style Roll", price: 16.90 },
  { name: "T8. Maki Tempura", price: 7.50 },

  { name: "M1. Sake Maki", price: 5.50 },
  { name: "M2. Tekka Maki", price: 6},
  { name: "M3. Ebi Maki", price: 6 },
  { name: "M4. Surimi Maki", price: 5 },
  { name: "M5. Unagi Maki", price: 6 },
  { name: "M6. Spicy Tuna Maki", price: 5.50 },
  { name: "M7. Spicy Tuna Maki", price: 5 },
  { name: "M8. Tamago Maki", price: 5 },
  { name: "M9. Kappa Maki (Vegan)", price: 4.50 },
  { name: "M10. Abokado Maki (Vegan)", price: 4.50 },
  { name: "M11. Radisshu Maki", price: 4.50 },
  { name: "M12. Sake Abokado Maki", price: 6 },
  { name: "M13. Abi kappa Maki", price: 6},
  { name: "M14. Spicy Tunatatar Maki", price: 6.50 },
  { name: "M15. California Maki", price: 6.50 },
  { name: "M16. Spicy Saketatar Maki", price: 6 },

  { name: "U1.Alaska ", price: 9.50 },
  { name: "U2.California", price: 12.50 },
  { name: "U3.Tekka Roll", price: 11 },
  { name: "U4.Spicy Tuna Roll", price: 11 },
  { name: "U5.Spicy Ebi Roll", price: 12 },
  { name: "U6.Ebiten Roll", price: 12.50 },
  { name: "U7.Spice Sake Roll", price: 10 },
  { name: "U8.Himalaya", price: 12.90 },
  { name: "U9.Sake Aburi", price: 13.90 },
  { name: "U10.Ebiten Special Roll", price: 16 },
  { name: "U11.Philiadelphia Roll", price: 14.50 },
  { name: "U12.Dragon Roll", price: 16 },
  { name: "U13.Rainbow Roll", price: 15 },
  { name: "U14.Hanabi Deluxe Roll", price: 14 },
  { name: "U15.Maguro Tataki Roll", price: 15.50 },
  { name: "U16.Cali Special Roll", price: 15 },
  { name: "U17.Spicy Sake Special Roll", price: 14 },
  { name: "U18.Sizzling Temptation", price: 13.90 },
  { name: "U19.Blazing Tuna", price: 14.50 },
  { name: "U20.Veggi", price: 8.50 },

  { name: "N1.Avocado ", price: 4.90 },
  { name: "N2.TamaGo ", price: 5.50 },
  { name: "N3. Sake", price: 5.20 },
  { name: "N4. Maguro", price: 6 },
  { name: "N7. Unagi", price: 6.50 },
  { name: "N9. Inari", price: 3.90 },
  { name: "N10. Hokkigai", price: 5.90 },

  { name: "S1. Sake", price: 12.90 },
  { name: "S2. Maguro", price: 14.50 },
  { name: "S6. Hokkigai", price: 15.50 },
  { name: "S7. Moriawase", price: 35.00 },

  { name: "G1. Ebi Gunkan", price: 8 },
  { name: "G2. Spicy Saketatar Gunkan ", price: 7.50 },
  { name: "G3. Spicy Tunatatat Gunkan", price: 8.50 },
  { name: "G4. Wakame Gunkan", price: 6 },
  { name: "G5. Spicy Sake Gunkan", price: 6.50 },
  { name: "G6. Spicy Tunata", price: 7.50 },

  { name: "Set 1 Hanabi-Sushi", price: 13.50 },
  { name: "Set 2 Hanabi-Sushi", price: 13 },
  { name: "Set 3 Hanabi-Sushi", price: 25.50 },
  { name: "Set 4 Hanabi-Sushi", price: 27.50 },
  { name: "Set 5 Hanabi-Sushi", price: 22 },
  { name: "Set 6 Hanabi-Sushi", price: 25 },
  { name: "Set 7 Hanabi-Sushi", price: 43 },
  { name: "Set 8 Hanabi-Sushi", price: 45 },
  { name: "Set 9 Hanabi-Sushi", price: 22 },
  { name: "Set 10 Hanabi-Sushi", price: 23.90 },

  { name: "20.Gebratene Nudeln", price: 7.50 },
  { name: "21.Hähnchen", price: 11.90 },
  { name: "22.Ente", price: 13.90 },
  { name: "23.Hähnchenfleisch", price: 8.90 },
  { name: "23a.mit Rindfleisch", price: 11.90 },
  { name: "24.Garnelen", price: 13.90 },
  { name: "25.Gebratener Reis", price:7.50 },
  { name: "26.Hähnchen", price: 11.90 },
  { name: "27.Ente", price: 13.90 },
  { name: "28.Hähnchenfleisch", price: 8.90 },
  { name: "28a.mit Rindfleisch", price: 11.90 },
  { name: "29.Garnelen", price: 13.90 },

  { name: "30.Gebratene Reisbandnudeln", price: 9.50 },
  { name: "31.Hähnchen", price: 12.90 },
  { name: "32.Ente", price: 15.90 },
  { name: "33.Hähnchenfleisch", price: 10.90 },
  { name: "33a.mit Rindfleisch", price: 12.90 },
  { name: "34.Garnelen", price: 15.90 },

  { name: "40.Curry mit Tofu", price: 8.90 },
  { name: "41.Hähnchen gebraten", price: 10.90 },
  { name: "42.Rindfleisch", price: 12.90 },
  { name: "43.Garnelen", price: 13.90 },
  { name: "44.Ente knusprig", price: 13.90 },
  { name: "45.Knuspriges Hähnchen", price: 11.90 },
  { name: "46.Lachs oder Maguro Power", price: 13.90 },

  { name: "50.mit Tofu", price: 8.90 },
  { name: "51.Hähnchen gebraten", price: 10.90 },
  { name: "52.Rindfleisch", price: 12.90 },
  { name: "53.Garnelen", price: 13.90 },
  { name: "54.Ente knusprig", price: 13.90 },
  { name: "55.Knuspriges Hähnchen", price: 11.90 },
  { name: "56.Lachs oder Maguro Power", price: 13.90 },

  { name: "60.mit Tofu", price: 8.90 },
  { name: "61.Hähnchen gebraten", price: 10.90 },
  { name: "62.Rindfleisch", price: 12.90 },
  { name: "63.Garnelen", price: 13.90 },
  { name: "64.Ente knusprig", price: 13.90 },
  { name: "65.Knuspriges Hähnchen", price: 11.90 },
  { name: "66.Lachs oder Maguro Power", price: 13.90 },

  { name: "70.Kurz gebratenes Tofu", price: 9.90 },
  { name: "71.Vietnamesische Frühlingsrillen", price: 11.90 },
  { name: "72.Gebratenes Hähnchenfleisch", price: 11.90 },
  { name: "73.Rindfleisch gebraten ", price: 13.90 },

  { name: "75.Pho mit Tofu", price: 9.90 },
  { name: "76.Pho mit Hähnchen", price: 11.90 },
  { name: "77.Pho mit feinem Rindfleisch", price: 13.90 },
  { name: "78.Pho Mix", price: 15.90 },

  { name: "80.Pikante Sauce Tofu", price: 8.90 },
  { name: "81.Pikante Sauce Hähnchen", price: 10.90 },
  { name: "82.Pikante Sauce Rindfleisch ", price: 12.90 },
  { name: "83.Pikante Sauce Garnelen ", price: 13.90 },
  { name: "84.Pikante Sauce Ente ", price: 13.90 },
  { name: "85.Pikante Sauce Knuspriges Hähnchen ", price: 11.90 },
  { name: "86.Pikante Sauce Lachs/Maguro Power ", price: 13.90 },

  { name: "90.Süß-Sauer Sauce Ente ", price: 13.90 },
  { name: "91.Süß-Sauer Sauce Hähnchen ", price: 11.90 },
  { name: "92.Süß-Sauer Sauce Garnelen ", price: 13.90 },

  { name: "93.Kung-PaoSauce Tofu ", price: 8.90 },
  { name: "94.Kung-PaoSauce Hähnchen ", price: 10.90 },
  { name: "95.Kung-PaoSauce Rindfleisch ", price: 12.90 },
  { name: "96.Kung-PaoSauce Garnelen ", price: 13.90 },
  { name: "97.Kung-PaoSauce Ente  ", price: 13.90 },
  { name: "98.Kung-PaoSauce Gebackenes Hähnchen ", price: 11.90 },
  { name: "99.Kung-PaoSauce Lachs/Maguro Power ", price: 13.90 },

  { name: "100.Erdnuss-Sauce Ente Gebacken ", price: 13.90 },
  { name: "101.Erdnuss-Sauce Hähnchen Gebacken", price: 11.90 },
  { name: "A Kinder Menu ", price: 8.50 },
  { name: "B Kinder Menu", price: 8.50 },
  { name: "C Kinder Menu", price: 8.50 },

  { name: "Reis gebraten", price: 2.90 },
  { name: "Nudeln gebraten", price: 2.90 },
  { name: "Reis", price: 2.00 },

  { name: "Mochi", price: 4.90 },
  { name: "Gebacken Banane", price: 4.90 },
  { name: "Japan Eiscreme", price: 4.90 },




  { name: "Grüner Tee", price: 3.50 },
  { name: "Jasmin Tee", price: 3.50 },
  { name: "Ingwer Tee", price: 4.50 },
  { name: "Minz Tee", price: 4.50 },
  { name: "Zitronengrass Tee", price: 4.50 },

  { name: "Kaffe ", price: 3 },
  { name: "Capuchino", price:3.50  },
  { name: "Latte Machiato", price: 4 },
  { name: "Espresso", price: 3 },
  
  { name: "Wasser Flasche", price: 6.5 },
  { name: "Coca Cola ", price: 3.9 },
  { name: "Coca Light ", price: 3.9 },
  { name: "Coca Zero ", price: 3.9 },
  { name: "Fanta ", price: 3.9 },
  { name: "Sprite ", price:3.9 },
  { name: "Wasser Still", price: 2.5 },
  { name: "Wasser mit Köhlensaure", price: 2.5 },
  { name: "Coca Cola ", price: 2.5 },
  { name: "Coca Light ", price: 2.5 },
  { name: "Coca Zero ", price: 2.5 },
  { name: "Fanta ", price: 2.5 },
  { name: "Sprite ", price: 2.5 },
  { name: "Ginger Ale", price: 4.9 },
  { name: "Bitte Lemon", price: 4.9 },
  { name: "Ginger Ale", price: 2.9 },
  { name: "Bitte Lemon", price: 2.9 },

  { name: "Orangesaft", price: 2.90 },
  { name: "Apfelsaft", price: 2.90 },
  { name: "Mangosaft", price: 2.90 },
  { name: "Maracujasaft", price: 2.90},
  { name: "Orangesaft", price: 4.90 },
  { name: "Apfelsaft", price: 4.90 },
  { name: "Mangosaft", price: 4.90 },
  { name: "Maracujasaft", price: 4.90 },

  { name: "OrangeSchorle", price: 2.90 },
  { name: "ApfelSchorle", price: 2.90 },
  { name: "MangoSchorle", price: 2.90 },
  { name: "MaracujaSchorle", price: 2.90},
  { name: "OrangeSchorle", price: 4.90 },
  { name: "ApfelSchorle", price: 4.90 },
  { name: "MangoSchorle", price: 4.90 },
  { name: "MaracujaSchorle", price: 4.90 },

  { name: "Bier von Fass", price: 3.90 },
  { name: "Bier von Fass", price: 4.90 },
  { name: "Alster ", price: 3.90 },
  { name: "Alster ", price: 4.90 },
  { name: "Weizenbier", price: 4.50 },
  { name: "Tiger Bier", price: 4.50 },
  { name: "Rose Wein", price: 5.50 },
  { name: "Hausmarke Dornfelder", price: 5.50 },
  { name: "Prosecco", price: 5.50 },
  { name: "Sake ", price: 5.50 },
  { name: "Weinschorle", price: 5.50 },
  { name: "Linie Aquavit", price: 3 },
  { name: "Maltester", price: 3 },
  { name: "Jägermeister", price: 3},
  { name: "Fernet Branca", price: 3 },
  { name: "Ramaazotti", price: 3 },
];

const App = () => {
  // Read from localStorage and set the initial state for tables and orders
  const storedTables = JSON.parse(localStorage.getItem("tables")) || Array.from({ length: 11 }, (_, i) => i + 1);
  const storedOrders = JSON.parse(localStorage.getItem("orders")) || {};

  const [tables, setTables] = useState(storedTables);
  const [orderItems, setOrderItems] = useState(storedOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState(null);
  const [abholungCount, setAbholungCount] = useState(0);

  // WebSocket connection
  const socket = new WebSocket("ws://localhost:8080");

  useEffect(() => {
    // Listen for incoming messages from WebSocket server
    socket.onopen = () => console.log("Connected to WebSocket server");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // If the data type is 'updateOrders', sync orders for the table
      if (data.type === "updateOrders") {
        const updatedOrders = { ...storedOrders, ...data.orders };
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        setOrderItems(updatedOrders[currentTable] || []); // Update UI for the current table
      }
    };

    return () => socket.close(); // Cleanup on unmount
  }, [currentTable]); // Re-run when the table changes

  // Add an "Abholung" table with a dynamic name (e.g., Abholung 1, Abholung 2)
  const addTable = () => {
    const newAbholungName = `Abholung ${abholungCount + 1}`;
    const updatedTables = [...tables, newAbholungName];
    setTables(updatedTables);
    localStorage.setItem("tables", JSON.stringify(updatedTables)); // Save to localStorage
    setAbholungCount(abholungCount + 1);
  };

  // Handle clicking on a table to open the modal and reset order items
  const handleTableClick = (tableName) => {
    setCurrentTable(tableName);
    setIsModalOpen(true);
    setOrderItems(storedOrders[tableName] || []); // Load the saved order items for the selected table
  };

  // Add order item (dish) to the list
  const addOrderItem = (name, price) => {
    const newOrderItem = { name, price };
    const updatedOrderItems = [...orderItems, newOrderItem];
    setOrderItems(updatedOrderItems);

    // Save the updated order items to localStorage for the specific table
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Send update to WebSocket server for the current table's orders
    socket.send(JSON.stringify({
      type: "updateOrders",
      orders: { [currentTable]: updatedOrderItems }
    }));
  };

  // Remove order item from the list
  const removeOrderItem = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);

    // Update the order in localStorage for the specific table
    const updatedOrders = { ...storedOrders, [currentTable]: updatedOrderItems };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Send updated order list to WebSocket server
    socket.send(JSON.stringify({
      type: "updateOrders",
      orders: { [currentTable]: updatedOrderItems }
    }));
  };


  return (
    <div className="w-full max-w-[412px] h-[915px] overflow-y-auto mx-auto bg-white text-black flex flex-col items-center p-10">
      <img src="/hanabi.jpg" className="h-24 w-auto mb-10" />
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
        {tables.map((table, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handleTableClick(table)}
          >
            <Table number={table} />
          </div>
        ))}
      </div>
      <button
        onClick={addTable}
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Abholung
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tableName={currentTable}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        tables={tables}
        setTables={setTables}
        addOrderItem={addOrderItem}
        removeOrderItem={removeOrderItem}
        dishes={dishes}
      />
    </div>
  );
};  

export default App;
