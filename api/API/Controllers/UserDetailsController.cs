using API.Filters;
using API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.DataService;
using Service.DataService.Model;
using System;

namespace API.Controllers
{
    [ApiKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly Response response;
        private IConfiguration _config;
        private UserService userService;

        public UserDetailsController(IConfiguration config)
        {
            _config = config;
            userService = new UserService(config.GetValue<string>("ConnectionString"));
            response = new Response();
        }

        [HttpGet]
        public IActionResult GetUserDetails(int? id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.UserDetails(id);

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

        [HttpPost("changePassword")]
        public IActionResult ChangePassword(ChangePassword changePassword)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.ChangePassword(changePassword);

                if (null == data)
                    return StatusCode(404);

                if (data == "OK")
                {
                    response.status_code = 200;
                    response.data = "The password has been successfully updated!";
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
