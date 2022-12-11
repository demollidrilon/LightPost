using API.Filters;
using API.Model;
using API.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.DataService;
using Service.DataService.Model;
using System;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly Response response;
        private IConfiguration _config;
        private RegisterService registerService;

        public RegisterController(IConfiguration config)
        {
            _config = config;
            registerService = new RegisterService(config.GetValue<string>("ConnectionString"));
            response = new Response();
        }

        [HttpPost]
        public IActionResult RegisterUser([FromBody] RegisterUser registerUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var registerResponse = registerService.RegisterUser(registerUser);

                if (null == registerResponse)
                    return StatusCode(404);

                if(registerResponse == "OK")
                {
                    response.status_code = 200;
                    response.data = "The user has been successfully registered!";
                    response.total = 1;
                    response.exception_message = null;
                }
                else
                {
                    response.status_code = 400;
                    response.data = registerResponse;
                    response.total = 1;
                    response.exception_message = registerResponse;
                }

                return Ok(new { response });
            }
            catch (Exception ex)
            {
                response.exception_message = ex.Message;
                response.status_code = 500;
                return StatusCode(500, response);
            }
        }
    }
}
