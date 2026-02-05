using MiniProductApi.Data;
using MiniProductApi.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ProductStore>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("Frontend");

app.MapProductEndpoints();

app.Run();

// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// ...
// app.UseSwagger();
// app.UseSwaggerUI();
