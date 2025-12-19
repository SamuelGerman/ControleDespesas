using GerenciamentoDespesas.Data;
using GerenciamentoDespesas.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//injeção de dependência, singleton para o contexto de dados (pois é um arquivo unico) e scoped para os serviços
builder.Services.AddSingleton<JsonDataContext>();
builder.Services.AddScoped<PersonService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<TransactionService>();

// Configura��o de CORS (Para o React acessar)
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