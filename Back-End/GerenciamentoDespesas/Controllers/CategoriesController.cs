using GerenciamentoDespesas.Models;
using GerenciamentoDespesas.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoDespesas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _categoryservice;
        public CategoriesController(CategoryService service) => _categoryservice = service;

        [HttpGet]
        public IActionResult Get() => Ok(_categoryservice.GetAll());

        [HttpPost]
        public IActionResult Create(Category category) => Created("", _categoryservice.Create(category));
    }
}
