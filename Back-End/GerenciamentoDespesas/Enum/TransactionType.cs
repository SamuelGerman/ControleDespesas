using System.Text.Json.Serialization;

namespace GerenciamentoDespesas.Enum
{
    //Define os tipos de transações: Despesa ou Receita
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TransactionType { Despesa, Receita }
}
