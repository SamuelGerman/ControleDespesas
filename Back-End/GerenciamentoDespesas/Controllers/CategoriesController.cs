using GerenciamentoDespesas.Models;
using GerenciamentoDespesas.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoDespesas.Controllers
{
    // O controller de categorias possui endpoints para listar e criar categorias. Listar (Get) e Criar (Post)
    // Reaproveita os métodos do serviço de categorias e do controller base do ASP.NET Core
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _categoryservice;
        public CategoriesController(CategoryService service) => _categoryservice = service;

        // Endpoint para listar todas as categorias
        [HttpGet]
        public IActionResult Get() => Ok(_categoryservice.GetAll());

        // Endpoint para criar uma nova categoria
        [HttpPost]
        public IActionResult Create(Category category) => Created("", _categoryservice.Create(category));
    }
}
