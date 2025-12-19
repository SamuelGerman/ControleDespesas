namespace GerenciamentoDespesas.Models
{

    // Representa uma pessoa com um ID único, nome e idade
    public class Person
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
    }
}
