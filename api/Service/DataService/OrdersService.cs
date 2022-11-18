using Dapper;
using Service.DataService.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService
{
    public class OrdersService : DataAccess
    {
        public OrdersService(string sqlConnection)
           : base(sqlConnection)
        { }

        public List<Orders> GetOrders(int? id, int? statusId, string? driver, string? fromDate, string? untilDate)
        {
            List<Orders> orders;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", id);
            param.Add("@StatusId", statusId == 1 ? null : statusId);
            param.Add("@Driver", driver);
            param.Add("@FromDate", fromDate);
            param.Add("@UntilDate", untilDate);
            string procedure = "OrdersSelect_sp";
            orders = (List<Orders>)GetListSp<Orders>(procedure, param);

            return orders;
        }
    }
}
