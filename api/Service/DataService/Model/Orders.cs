using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService.Model
{
    public class Orders
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int Code { get; set; }
        public string NameSurname { get; set; }
        public string TelephoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public decimal Price { get; set; }
        public string Comment { get; set; }
        public string Driver { get; set; }
        public string CreatedDate { get; set; }
        public string LastUpdate { get; set; }
        public decimal TransportationPrice { get; set; }
        public int CountryId { get; set; }
        public long EquationId { get; set; }
        public int StatusId { get; set; }
    }

    public class OrderComments
    {
        public int Id { get; set; }
        public int OrderCode { get; set; }
        public string Personel { get; set; }
        public string TelephoneNumber { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
        public string CreatedDate { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string ActualStatus { get; set; }
        public string OrderCreatedDate { get; set; }
    }
}
