import { useEffect, useState } from "react";

export default function EditProductDialog({ product, onClose, onSave }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!product) return;
    setName(product.name ?? "");
    setPrice(String(product.price ?? ""));
  }, [product]);

  if (!product) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanName = name.trim();
    const numericPrice = Number(price);

    if (!cleanName) return;
    if (Number.isNaN(numericPrice) || numericPrice < 0) return;

    onSave({ id: product.id, name: cleanName, price: numericPrice });
  };

  return (
    <div
      className="dialog"
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <h3>Edit product</h3>
        <form className="stack" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
          <div className="row">
            <button className="btn" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
