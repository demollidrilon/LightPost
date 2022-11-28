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

        public List<Orders> GetOrders(int? id, int? statusId, string? driver, string? fromDate, string? untilDate, string? manualSearch)
        {
            List<Orders> orders;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", id);
            param.Add("@StatusId", statusId == 1 ? null : statusId);
            param.Add("@FromDate", fromDate);
            param.Add("@UntilDate", untilDate);
            param.Add("@ManualSearch", manualSearch);
            string procedure = "OrdersSelect_sp";
            orders = (List<Orders>)GetListSp<Orders>(procedure, param);

            return orders;
        }

        public int CreateOrder(Orders model)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@NameSurname", model.NameSurname);
            param.Add("@CountryId", model.CountryId);
            param.Add("@City", model.City);
            param.Add("@Address", model.Address);
            param.Add("@TelephoneNumber", model.TelephoneNumber);
            param.Add("@Price", model.Price);
            param.Add("@Comment", model.Comment);
            param.Add("@StatusId", 2);

            string procedure = "CreateOrder_sp";
            int response = ExecuteProcedureInt(procedure, param);

            return response;
        }

        public string InsertOrderComments()
        {
            DynamicParameters param = new DynamicParameters();
            string procedure = "InsertOrderComments_sp";
            string response = ExecuteProcedure(procedure, param);

            return response;
        }

        public Orders GetOrderDetails(int? code)
        {
            Orders order;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Code", code);
            string procedure = "OrdersSelect_sp";
            order = GetObjectSp<Orders>(procedure, param);

            return order;
        }

        public List<OrderComments> GetOrderComments(int? code)
        {
            List<OrderComments> comments;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Code", code);
            string procedure = "OrderComments_sp";
            comments = (List<OrderComments>)GetListSp<OrderComments>(procedure, param);

            return comments;
        }

        public string DeleteOrder(int? code)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Code", code);
            string procedure = "OrdersDelete_sp";
            string response = ExecuteProcedure(procedure, param);

            return response;
        }
    }
}
