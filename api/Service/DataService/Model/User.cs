using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Service.DataService.Model
{
    public class LoginUser
    {
        public int Id { get; set; }
        [Required]
        public string Username {  get; set; }
        [Required]
        public string Password { get; set; } 
        public string Name { get; set; }
        public string Surname { get; set; }
        public string TelephoneNumber { get; set; }
        public string City { get; set; }
        public bool IsAdmin { get; set;}
        public bool IsDriver { get; set;}
    }

    public class Roles
    {
        public bool IsAdmin { get; set; }
        public bool IsDriver { get; set; }
    }

    public class RegisterUser
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string TelephoneNumber { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        public bool IsDriver { get; set; }
    }
}
