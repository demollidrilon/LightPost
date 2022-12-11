using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService.Model
{
    public class ChangePassword
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string SetPassword { get; set; }
    }
}
