const formatCurrency = (value) => `$${value.toFixed(2)}`;

export default function Stats({ products }) {
  const total = products.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const average = products.length ? total / products.length : 0;

  return (
    <div className="stats">
      <span>{products.length} items</span>
      <span>Total {formatCurrency(total)}</span>
      <span>Avg {formatCurrency(average)}</span>
    </div>
  );
}
