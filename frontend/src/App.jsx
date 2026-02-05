import { useEffect, useMemo, useState } from "react";
import { createApiClient } from "./services/apiClient.js";
import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";
import EditProductDialog from "./components/EditProductDialog.jsx";
import Stats from "./components/Stats.jsx";
import { DEFAULT_BASE } from "./constants/config.js";
import seedProducts from "./data/seedProducts.js";

export default function App() {
  const [baseUrl] = useState(DEFAULT_BASE);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");

  const api = useMemo(() => createApiClient(baseUrl), [baseUrl]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => setToast(""), 2200);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      setProducts(data);
    } catch (error) {
      showToast(error.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [baseUrl]);

  const handleCreate = async (payload) => {
    setSaving(true);
    try {
      await api.create(payload);
      showToast("Product created");
      await loadProducts();
    } catch (error) {
      showToast(error.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async ({ id, name, price }) => {
    setSaving(true);
    try {
      await api.update(id, { name, price });
      showToast("Product updated");
      setEditing(null);
      await loadProducts();
    } catch (error) {
      showToast(error.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await api.remove(id);
      showToast("Product deleted");
      await loadProducts();
    } catch (error) {
      showToast(error.message || "Delete failed");
    } finally {
      setSaving(false);
    }
  };

  const handleSeed = async () => {
    setSaving(true);
    try {
      for (const item of seedProducts) {
        await api.create(item);
      }
      showToast("Seeded sample products");
      await loadProducts();
    } catch (error) {
      showToast(error.message || "Seed failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="bg-shapes" />
      <header className="hero">
        <div className="hero-inner">
          <div className="badge">Mini Product Admin</div>
          <h1>Run your product list like a studio.</h1>
          <p>
            A tiny front end for your minimal API. Create, edit, and curate products
            with a focused interface.
          </p>
          <div className="hero-actions">
            <button className="btn primary" type="button" onClick={loadProducts}>
              Refresh
            </button>
            <button className="btn ghost" type="button" onClick={handleSeed} disabled={saving}>
              Seed Sample
            </button>
          </div>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <h2>Create product</h2>
          <ProductForm onCreate={handleCreate} busy={saving} />
        </section>

        <section className="panel span-2">
          <div className="panel-head">
            <div>
              <h2>Products</h2>
              <p className="muted">Manage your catalog in real time.</p>
            </div>
            <Stats products={products} />
          </div>
          <ProductList
            products={products}
            busy={loading}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {editing && (
        <EditProductDialog
          product={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </div>
  );
}
