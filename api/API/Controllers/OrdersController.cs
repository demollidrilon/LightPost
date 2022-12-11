using API.Filters;
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
        public IActionResult CreateOrder([FromBody] Orders order)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.CreateOrder(order);
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

        [HttpPost("addComment")]
        public IActionResult AddCommentToOrder([FromBody] OrderDetails addCommentToOrder)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (addCommentToOrder.StatusId == 100)
                addCommentToOrder.StatusId = null;

            try
            {
                var data = ordersService.AddCommentToOrder(addCommentToOrder);

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
        public IActionResult DeleteOrders([FromBody] OrderDetails deleteOrder)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.DeleteOrder(deleteOrder);

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
        public IActionResult GetOrders([FromForm] OrderDetails getOrders)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.GetOrders(getOrders);

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

        [HttpGet("allOrders")]
        public IActionResult GetAllOrders(int? id, int? statusId, string? driverId, string? fromDate, string? untilDate, string? manualSearch, int? clientId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.GetAllOrders(id, statusId, driverId, fromDate, untilDate, manualSearch, clientId);

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

        [HttpPost("setDriverForOrder")]
        public IActionResult SetDriverForOrder(int? code, int? driverId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.SetDriverForOrder(code, driverId);

                if (null == data)
                    return StatusCode(404);

                if (data == "OK")
                {
                    response.status_code = 200;
                    response.data = "The driver has been set successfully for selected order!";
                    response.total = 1;
                    response.exception_message = null;
                }
                else
                {
                    response.status_code = 400;
                    response.data = data;
                    response.total = 1;
                    response.exception_message = data;
                }

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
