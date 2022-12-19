using API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.DataService;
using Service.DataService.Model;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquationsController : ControllerBase
    {
        private readonly Response response;
        private IConfiguration _config;
        private EquationsService equationsService;

        public EquationsController(IConfiguration config)
        {
            _config = config;
            equationsService = new EquationsService(config.GetValue<string>("ConnectionString"));
            response = new Response();
        }

        [HttpGet]
        public IActionResult GetEquations()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = equationsService.GetEquations();

                if (null == data)
                    return StatusCode(404);

                response.status_code = 200;
                response.data = data;
                response.total = 1;

                return Ok(new { response });
            }
            catch (Exception ex)
            {
                response.exception_message = ex.Message;
                return StatusCode(500, response);
            }
        }

        [HttpGet("orders")]
        public IActionResult GetEquationOrders(int equationId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = equationsService.GetEquationOrders(equationId);

                if (null == data)
                    return StatusCode(404);

                response.status_code = 200;
                response.data = data;
                response.total = 1;

                return Ok(new { response });
            }
            catch (Exception ex)
            {
                response.exception_message = ex.Message;
                return StatusCode(500, response);
            }
        }
    }
}
