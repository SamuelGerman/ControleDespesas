using GerenciamentoDespesas.Models;
using GerenciamentoDespesas.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoDespesas.Controllers
{
    // O controller de pessoas possui endpoints para listar, criar e deletar pessoas. Listar (Get), Criar (Post) e Deletar (Delete)
    // Reaproveita os métodos do serviço de pessoas e do controller base do ASP.NET Core
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly PersonService _personservice;
        public PeopleController(PersonService service) => _personservice = service;

        // Endpoint para listar todas as pessoas
        [HttpGet]
        public IActionResult Get() => Ok(_personservice.GetAll());

        // Endpoint para criar uma nova pessoa
        [HttpPost]
        public IActionResult Create(Person person) => Created("", _personservice.Create(person));

        // Endpoint para deletar uma pessoa e suas transações pelo ID
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            if (_personservice.Delete(id)) return NoContent();
            return NotFound();
        }
    }
}
