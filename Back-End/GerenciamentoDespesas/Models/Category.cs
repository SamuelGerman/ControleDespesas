using GerenciamentoDespesas.Enum;

namespace GerenciamentoDespesas.Models
{
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Description { get; set; } = string.Empty;
        public CategoryPurpose Purpose { get; set; }
    }
}
