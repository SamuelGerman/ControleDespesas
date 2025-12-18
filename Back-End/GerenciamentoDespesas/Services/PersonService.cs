using GerenciamentoDespesas.Data;
using GerenciamentoDespesas.Models;

namespace GerenciamentoDespesas.Services
{
    public class PersonService
    {
        private readonly JsonDataContext _context;
        public PersonService(JsonDataContext context) => _context = context;

        public IEnumerable<Person> GetAll() => _context.Data.People;

        public Person Create(Person person)
        {
            person.Id = Guid.NewGuid();
            _context.Data.People.Add(person);
            _context.SaveChanges();
            return person;
        }

        public bool Delete(Guid id)
        {
            var person = _context.Data.People.FirstOrDefault(p => p.Id == id);
            if (person == null) return false;

            _context.Data.People.Remove(person);
            _context.Data.MoneyTransactions.RemoveAll(t => t.PersonId == id);

            _context.SaveChanges();
            return true;
        }
    }
}
