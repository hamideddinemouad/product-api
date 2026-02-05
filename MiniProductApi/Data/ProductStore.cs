using System.Collections.Concurrent;
using MiniProductApi.Domain;

namespace MiniProductApi.Data;

public class ProductStore
{
    private readonly ConcurrentDictionary<int, Product> _items = new();
    private int _nextId = 1;

    public IEnumerable<Product> GetAll() => _items.Values.OrderBy(p => p.Id);

    public bool TryGet(int id, out Product? product) => _items.TryGetValue(id, out product);

    public Product Create(string name, decimal price)
    {
        var id = _nextId++;
        var product = new Product(id, name, price);
        _items[id] = product;
        return product;
    }

    public bool TryUpdate(int id, Func<Product, Product> update, out Product? updated)
    {
        updated = null;
        if (!_items.TryGetValue(id, out var existing)) return false;

        updated = update(existing);
        _items[id] = updated;
        return true;
    }

    public bool Delete(int id) => _items.TryRemove(id, out _);
}
