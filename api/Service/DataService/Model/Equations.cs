using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService.Model
{
    public class Equations
    {
        public int Id { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalOrderRejections { get; set; }
        public decimal TotalNET { get; set; }
        public decimal TotalTransportationCost { get; set; }
        public string CreatedDate { get; set; }
    }
}
