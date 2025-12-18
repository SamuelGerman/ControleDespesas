using GerenciamentoDespesas.Models;

namespace GerenciamentoDespesas.Data
{
    public class DatabaseSchema
    {
        public List<Person> People { get; set; } = new();
        public List<Category> Categories { get; set; } = new();
        public List<MoneyTransaction> MoneyTransactions { get; set; } = new();
    }
}
