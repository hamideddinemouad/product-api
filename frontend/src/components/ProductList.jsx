const formatPrice = (price) => {
  if (Number.isNaN(price)) return "-";
  return `$${Number(price).toFixed(2)}`;
};

export default function ProductList({ products, busy, onEdit, onDelete }) {
  if (busy) {
    return <div className="empty">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="empty">No products yet. Add the first one.</div>;
  }

  return (
    <div className="list">
      {products.map((product) => (
        <article className="card" key={product.id}>
          <div className="card-head">
            <strong>{product.name}</strong>
            <span className="price">{formatPrice(product.price)}</span>
          </div>
          <div className="muted">ID: {product.id}</div>
          <div className="card-actions">
            <button className="btn" type="button" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button className="btn ghost" type="button" onClick={() => onDelete(product.id)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
