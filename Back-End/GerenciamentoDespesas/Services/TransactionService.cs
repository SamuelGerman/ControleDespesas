using GerenciamentoDespesas.Data;
using GerenciamentoDespesas.Enum;
using GerenciamentoDespesas.Models;

namespace GerenciamentoDespesas.Services
{
    public class TransactionService
    {
        private readonly JsonDataContext _context;

        public TransactionService(JsonDataContext context) => _context = context;

        public IEnumerable<MoneyTransaction> GetAll() => _context.Data.MoneyTransactions;

        public MoneyTransaction Create(MoneyTransaction transaction)
        {
            var person = _context.Data.People.FirstOrDefault(p => p.Id == transaction.PersonId);
            if (person == null) throw new ArgumentException("Pessoa não encontrada.");

            var category = _context.Data.Categories.FirstOrDefault(c => c.Id == transaction.CategoryId);
            if (category == null) throw new ArgumentException("Categoria não encontrada.");

            if (person.Age < 18 && transaction.Type == TransactionType.Receita)
            {
                throw new InvalidOperationException("Menores de idade só podem ter despesas.");
            }

            if (category.Purpose != CategoryPurpose.Ambas)
            {
                if (category.Purpose.ToString() != transaction.Type.ToString())
                {
                    throw new InvalidOperationException($"A categoria '{category.Description}' não aceita lançamentos do tipo '{transaction.Type}'.");
                }
            }

            transaction.Id = Guid.NewGuid();
            transaction.Date = DateTime.Now;

            _context.Data.MoneyTransactions.Add(transaction);
            _context.SaveChanges();

            return transaction;
        }
    }
}
