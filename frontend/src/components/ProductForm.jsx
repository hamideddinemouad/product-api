import { useState } from "react";

export default function ProductForm({ onCreate, busy }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanName = name.trim();
    const numericPrice = Number(price);

    if (!cleanName) return;
    if (Number.isNaN(numericPrice) || numericPrice < 0) return;

    onCreate({ name: cleanName, price: numericPrice });
    setName("");
    setPrice("");
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />
      <button className="btn primary" type="submit" disabled={busy}>
        {busy ? "Saving..." : "Add"}
      </button>
    </form>
  );
}
