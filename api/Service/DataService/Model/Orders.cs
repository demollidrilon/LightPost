using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService.Model
{
    public class Orders
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int Code { get ; set; } 
        public string NameSurname { get; set; }
        public string TelephoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public decimal Price { get; set; }
        public string Comment { get; set; }
        public string Driver { get; set; }
        public string CreatedDate { get; set; }
        public string LastUpdate { get; set; }
    }
}
