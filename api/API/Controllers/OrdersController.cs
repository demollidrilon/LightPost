﻿using API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.DataService;
using System;

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

        [HttpGet]
        public IActionResult GetOrders(int? id, int? statusId, string? driver, string? fromDate, string? untilDate)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = ordersService.GetOrders(id, statusId, driver, fromDate, untilDate);

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