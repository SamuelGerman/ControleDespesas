using GerenciamentoDespesas.Models;

namespace GerenciamentoDespesas.Data
{
    // Representa o esquema do banco de dados em memória, contendo listas de pessoas, categorias e transações
    // Para esse projeto, escolhi um esquema simples de armazenamento de dados em json, ao invés de integração com banco de dados relacional
    //Em um projeto de maior escala, aqui seria o equivalente ao contexto do banco de dados
    public class DatabaseSchema
    {
        public List<Person> People { get; set; } = new();
        public List<Category> Categories { get; set; } = new();
        public List<MoneyTransaction> MoneyTransactions { get; set; } = new();
    }
}
