using System.Text.Json.Serialization;

namespace GerenciamentoDespesas.Enum
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CategoryPurpose { Despesa, Receita, Ambas }
}
