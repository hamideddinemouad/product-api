using MiniProductApi.Contracts;
using MiniProductApi.Data;

namespace MiniProductApi.Endpoints;

public static class ProductEndpoints
{
    public static RouteGroupBuilder MapProductEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/products");

        group.MapGet("/", (ProductStore store) => Results.Ok(store.GetAll()));

        group.MapGet("/{id:int}", (int id, ProductStore store) =>
            store.TryGet(id, out var p) ? Results.Ok(p) : Results.NotFound());

        group.MapPost("/", (CreateProductDto dto, ProductStore store) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Name)) return Results.BadRequest("Name is required");
            if (dto.Price < 0) return Results.BadRequest("Price must be >= 0");

            var created = store.Create(dto.Name.Trim(), dto.Price);
            return Results.Created($"/products/{created.Id}", created);
        });

        group.MapPut("/{id:int}", (int id, UpdateProductDto dto, ProductStore store) =>
        {
            if (dto.Price is not null && dto.Price < 0) return Results.BadRequest("Price must be >= 0");

            var ok = store.TryUpdate(id, existing =>
            {
                var name = string.IsNullOrWhiteSpace(dto.Name) ? existing.Name : dto.Name.Trim();
                var price = dto.Price ?? existing.Price;
                return existing with { Name = name, Price = price };
            }, out var updated);

            return ok ? Results.Ok(updated) : Results.NotFound();
        });

        group.MapDelete("/{id:int}", (int id, ProductStore store) =>
            store.Delete(id) ? Results.NoContent() : Results.NotFound());

        return group;
    }
}
