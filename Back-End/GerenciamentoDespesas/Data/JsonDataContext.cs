using System.Text.Json;

namespace GerenciamentoDespesas.Data
{
    public class JsonDataContext
    {
        private readonly string _filePath = "database.json";
        private DatabaseSchema _data;
        private readonly object _lock = new();

        public JsonDataContext()
        {
            _data = LoadData();
        }

        public DatabaseSchema Data => _data;

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
