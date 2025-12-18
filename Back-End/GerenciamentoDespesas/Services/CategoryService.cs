using GerenciamentoDespesas.Data;
using GerenciamentoDespesas.Models;

namespace GerenciamentoDespesas.Services
{
    public class CategoryService
    {
        private readonly JsonDataContext _context;
        public CategoryService(JsonDataContext context) => _context = context;

        public IEnumerable<Category> GetAll() => _context.Data.Categories;

        public Category Create(Category category)
        {
            category.Id = Guid.NewGuid();
            _context.Data.Categories.Add(category);
            _context.SaveChanges();
            return category;
        }

        public Category? GetById(Guid id) => _context.Data.Categories.FirstOrDefault(c => c.Id == id);
    }
}
