using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService.Model
{
    public class OrderDetails
    {
        public int? Id { get; set; }
        public int? StatusId { get; set; }
        public int? DriverId { get; set; }
        public string? FromDate { get; set; }
        public string? UntilDate { get; set; }
        public string? ManualSearch { get; set; }
        public int? Code { get; set; }
        public bool? OnlyComments { get; set; }
        public string? Comment { get; set; }
        public int? PersonelId { get; set; }
    }
}
