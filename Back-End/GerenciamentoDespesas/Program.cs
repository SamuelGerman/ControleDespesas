using GerenciamentoDespesas.Data;
using GerenciamentoDespesas.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Injeção de Dependência (Singleton para manter o estado do arquivo em memória enquanto roda)
builder.Services.AddSingleton<JsonDataContext>();
builder.Services.AddScoped<PersonService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<TransactionService>();

// Configuração de CORS (Para o React acessar)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.MapControllers();

app.Run("http://localhost:5000");