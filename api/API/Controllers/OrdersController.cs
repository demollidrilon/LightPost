using API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.DataService;
using Service.DataService.Model;
using System;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly Response response;
        private IConfiguration _config;
        private OrdersService ordersService;

        public OrdersController(IConfiguration config)
        {
            _config = config;
            ordersService = new OrdersService(config.GetValue<string>("ConnectionString"));
            response = new Response();
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] Orders model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.CreateOrder(model);
                var insertComments = ordersService.InsertOrderComments();

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

        [HttpGet]
        public IActionResult GetOrders(int? id, int? statusId, string? driver, string? fromDate, string? untilDate, string? manualSearch)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.GetOrders(id, statusId, driver, fromDate, untilDate, manualSearch);

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

        [HttpGet("orderDetails")]
        public IActionResult GetOrderDetails(int? code)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.GetOrderDetails(code);

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

        [HttpGet("orderComments")]
        public IActionResult GetOrderComments(int? code, bool? onlyComments)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.GetOrderComments(code);
                if (onlyComments == true)
                    data = data.Where(x => x.Comment != "" && x.Comment != null).ToList();

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

        [HttpPost("deleteOrder")]
        public IActionResult DeleteOrders(int? code)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.DeleteOrder(code);

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
