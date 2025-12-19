using GerenciamentoDespesas.Enum;

namespace GerenciamentoDespesas.Models
{
    //Representa uma transação financeira, seja despesa ou receita, com detalhes como descrição, valor, tipo, data, categoria e pessoa associada
    public class MoneyTransaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

        public Guid CategoryId { get; set; }
        public Guid PersonId { get; set; }
    }
}
