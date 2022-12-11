using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService.Model
{
    public class Roles
    {
        public int Id { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsDriver { get; set; }
    }
}
