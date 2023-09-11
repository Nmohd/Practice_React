import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setdescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    setdescription("");
    setQuantity(1);
  };

  return (
    <>
      <form className="add-form mobile" onSubmit={handleSubmit}>
        <h3>What do you need for trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item...."
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <button>add</button>
      </form>
    </>
  );
}
