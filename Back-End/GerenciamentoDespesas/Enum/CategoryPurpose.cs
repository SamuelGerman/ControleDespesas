using System.Text.Json.Serialization;

namespace GerenciamentoDespesas.Enum
{
    //Define os propósitos de uma categoria: Despesa, Receita ou Ambas
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CategoryPurpose { Despesa, Receita, Ambas }
}
