import {React, useState} from "react";
import BarcodeScanner from "./components/BarcodeScanner";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <BarcodeScanner  onProductSave={addProduct}/>
      </div>
      <div>
        <KanbanBoard products={products}/>
      </div>
    </div>
  );
}

export default App;
