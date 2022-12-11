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
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly Response response;
        private IConfiguration _config;
        private RolesService rolesService;

        public RolesController(IConfiguration config)
        {
            _config = config;
            rolesService = new RolesService(config.GetValue<string>("ConnectionString"));
            response = new Response();

        }

        [HttpPost]
        public IActionResult GetRoles([FromBody]Roles role)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var data = rolesService.GetRoles(role);

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
