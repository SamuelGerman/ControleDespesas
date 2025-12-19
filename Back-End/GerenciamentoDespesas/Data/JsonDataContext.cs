using System.Text.Json;

namespace GerenciamentoDespesas.Data
{
    // Contexto de dados que gerencia a leitura e escrita do arquivo JSON que armazena os dados da aplicação
    public class JsonDataContext
    {
        private readonly string _filePath = "database.json";
        private DatabaseSchema _data;
        private readonly object _lock = new(); // Para garantir thread safety durante operações de escrita, pois estamos usando um unico arquivo como banco de dados

        public JsonDataContext()
        {
            _data = LoadData();
        }

        public DatabaseSchema Data => _data;

        // Carrega os dados do arquivo JSON, ou cria um novo esquema vazio se o arquivo não existir 
        private DatabaseSchema LoadData()
        {
            if (!File.Exists(_filePath)) return new DatabaseSchema();

            try
            {
                var json = File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<DatabaseSchema>(json) ?? new DatabaseSchema();
            }
            catch
            {
                return new DatabaseSchema();
            }
        }

        public void SaveChanges()
        {
            lock (_lock)
            {
                var options = new JsonSerializerOptions { WriteIndented = true };
                var json = JsonSerializer.Serialize(_data, options);
                File.WriteAllText(_filePath, json);
            }
        }
    }
}
