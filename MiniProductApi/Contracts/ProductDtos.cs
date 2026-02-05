namespace MiniProductApi.Contracts;

public record CreateProductDto(string Name, decimal Price);
public record UpdateProductDto(string? Name, decimal? Price);
