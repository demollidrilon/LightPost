using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService.Model
{
    public class UserDetails
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string TelephoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsDriver { get; set; }
        public int CmimiTransportitKS { get; set; }
        public int CmimiTransportitAL { get; set; }
        public int CmimiTransportitMK { get; set; }
    }
}
