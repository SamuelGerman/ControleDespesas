using GerenciamentoDespesas.Models;
using GerenciamentoDespesas.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoDespesas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _transactionService;
        public TransactionsController(TransactionService service) => _transactionService = service;

        [HttpGet]
        public IActionResult Get() => Ok(_transactionService.GetAll());

        [HttpPost]
        public IActionResult Create(MoneyTransaction transaction)
        {
            try
            {
                var created = _transactionService.Create(transaction);
                return Created("", created);
            }
            catch (ArgumentException ex) { return BadRequest(ex.Message); }
            catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
        }
    }
}
