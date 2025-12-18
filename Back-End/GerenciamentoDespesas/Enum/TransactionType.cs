using System.Text.Json.Serialization;

namespace GerenciamentoDespesas.Enum
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TransactionType { Despesa, Receita }
}
