using API.Filters;
using API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.DataService;
using Service.DataService.Model;
using System;

namespace API.Controllersaders
{
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

        [HttpGet("users")]
        public IActionResult GetUsers()
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.GetUsers();

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

        [HttpGet("usersForEquation")]
        public IActionResult GetUsersForEquation()
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.GetUsersForEquation();

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

        [HttpGet("drivers")]
        public IActionResult GetDrivers()
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.GetDrivers();

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
        public IActionResult GetUserDetails(int? id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.GetUserDetails(id);

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

        [HttpPost("changeUserRole")]
        public IActionResult ChangeUserRole([FromBody] UserRoleAndStatus userRoleAndStatus)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.ChangeUserRole(userRoleAndStatus);

                if (null == data)
                    return StatusCode(404);

                if (data == "OK")
                {
                    response.status_code = 200;
                    response.data = "The role has been successfully updated!";
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

        [HttpPost("changeUserStatus")]
        public IActionResult ChangeUserStatus([FromBody] UserRoleAndStatus userRoleAndStatus)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.ChangeUserStatus(userRoleAndStatus);

                if (null == data)
                    return StatusCode(404);

                if (data == "OK")
                {
                    response.status_code = 200;
                    response.data = "The status has been successfully updated!";
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

        [HttpPost("changeUserPassword")]
        public IActionResult ChangeUserPassword([FromBody] ChangePassword changePassword)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = userService.ChangeUserPassword(changePassword);

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
