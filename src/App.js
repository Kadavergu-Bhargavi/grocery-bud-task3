import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [items, setItems] = useState([]);

  const [itemName, setItemName] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const [editItem, setEditItem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName) {
      if (editItem) {
        const updatedItems = items.map((item) => {
          if (item.id === editItem.id) {
            return { ...item, title: itemName };
          }
          return item;
        });

        setItems(updatedItems);
        setEditItem(null);
        showAlert(true, "Item updated", "success");
      } else {
        const newItem = {
          id: new Date().getTime().toString(),
          title: itemName,
        };
        setItems([...items, newItem]);
        showAlert(true, "Item added to the list", "success");
      }
      setItemName("");
    } else {
      showAlert(true, "Please enter an item", "danger");
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    showAlert(true, "Item removed", "danger");
    setItems(updatedItems);
  };

  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setEditItem(itemToEdit);
    setItemName(itemToEdit.title);
  };

  const clearList = () => {
    showAlert(true, "Empty list", "danger");
    setItems([]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [items]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>{editItem ? "Edit Item" : "Grocery Bud"}</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {editItem ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      <List items={items} handleDelete={handleDelete} handleEdit={handleEdit} />
      {items.length > 0 && (
        <button className="clear-btn" onClick={clearList}>
          Clear All
        </button>
      )}
    </section>
  );
}

export default App;
