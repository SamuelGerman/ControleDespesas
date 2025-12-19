using GerenciamentoDespesas.Models;
using GerenciamentoDespesas.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenciamentoDespesas.Controllers
{
    // O controller de transações possui endpoints para listar e criar transações. Listar (Get) e Criar (Post)
    // Reaproveita os métodos do serviço de transações e do controller base do ASP.NET Core
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _transactionService;
        public TransactionsController(TransactionService service) => _transactionService = service;

        // Endpoint para listar todas as transações
        [HttpGet]
        public IActionResult Get() => Ok(_transactionService.GetAll());

        // Endpoint para criar uma nova transação
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
