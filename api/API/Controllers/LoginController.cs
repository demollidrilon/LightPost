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
    public class LoginController : ControllerBase
    {
        private readonly Response response;
        private IConfiguration _config;
        private LoginService loginService;

        public LoginController(IConfiguration config)
        {
            _config = config;
            loginService = new LoginService(config.GetValue<string>("ConnectionString"));
            response = new Response();
        }

        [HttpPost]
        public IActionResult LoginUser([FromBody] LoginUser loginUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = loginService.LoginUser(loginUser);

                if (null == data)
                    return StatusCode(404);

                var claims = new[]
                {
                     new Claim("Id", data.Id.ToString())
                };

                string token = String.Empty;
                token = JwtManager.GenerateJSONWebToken(_config, claims);

                response.status_code = 200;
                response.data = data;
                response.total = 1;

                return Ok(new { response, token });
            }
            catch (Exception ex)
            {
                response.exception_message = ex.Message;
                return StatusCode(500, response);
            }
        }
    }
}
