using GerenciamentoDespesas.Enum;

namespace GerenciamentoDespesas.Models
{
    // Representa uma categoria de despesa ou receita, com um ID único, descrição e propósito
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Description { get; set; } = string.Empty;
        public CategoryPurpose Purpose { get; set; }
    }
}
