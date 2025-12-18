using GerenciamentoDespesas.Models;
using GerenciamentoDespesas.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoDespesas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly PersonService _personservice;
        public PeopleController(PersonService service) => _personservice = service;

        [HttpGet]
        public IActionResult Get() => Ok(_personservice.GetAll());

        [HttpPost]
        public IActionResult Create(Person person) => Created("", _personservice.Create(person));

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            if (_personservice.Delete(id)) return NoContent();
            return NotFound();
        }
    }
}
