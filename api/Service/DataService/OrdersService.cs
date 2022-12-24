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

        public List<Orders> GetOrders(OrderDetails getOrders)
        {
            List<Orders> orders;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", getOrders.Id);
            param.Add("@DriverId", getOrders.DriverId);
            param.Add("@StatusId", getOrders.StatusId == 1 ? null : getOrders.StatusId);
            param.Add("@FromDate", getOrders.FromDate);
            param.Add("@UntilDate", getOrders.UntilDate);
            param.Add("@ManualSearch", getOrders.ManualSearch);
            string procedure = "OrdersSelect_sp";
            orders = (List<Orders>)GetListSp<Orders>(procedure, param);

            return orders;
        }

        public List<Orders> GetAllOrders(int? id, int? statusId, string? driverId, string? fromDate, string? untilDate, string? manualSearch, int? clientId)
        {
            List<Orders> orders;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", id);
            param.Add("@DriverId", driverId);
            param.Add("@StatusId", statusId == 1 ? null : statusId);
            param.Add("@FromDate", fromDate);
            param.Add("@UntilDate", untilDate);
            param.Add("@ManualSearch", manualSearch);
            param.Add("@ClientId", clientId);
            string procedure = "OrdersSelect_sp";
            orders = (List<Orders>)GetListSp<Orders>(procedure, param);

            return orders;
        }

        public int CreateOrder(Orders order)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@NameSurname", order.NameSurname);
            param.Add("@CountryId", order.CountryId);
            param.Add("@City", order.City);
            param.Add("@Address", order.Address);
            param.Add("@TelephoneNumber", order.TelephoneNumber);
            param.Add("@Price", order.Price);
            param.Add("@Comment", order.Comment);
            param.Add("@ClientId", order.ClientId);
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

        public List<OrderComments> GetOrderComments(int? code, int? clientId)
        {
            List<OrderComments> comments;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Code", code);
            param.Add("@ClientId", clientId);
            string procedure = "OrderComments_sp";
            comments = (List<OrderComments>)GetListSp<OrderComments>(procedure, param);

            return comments;
        }

        public string DeleteOrder(OrderDetails deleteOrder)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Code", deleteOrder.Code);
            string procedure = "OrdersDelete_sp";
            string response = ExecuteProcedure(procedure, param);

            return response;
        }

        public string AddCommentToOrder(OrderDetails addCommentToOrder)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Code", addCommentToOrder.Code);
            param.Add("@StatusId", addCommentToOrder.StatusId);
            param.Add("@Comment", addCommentToOrder.Comment);
            param.Add("@PersonelId", addCommentToOrder.PersonelId);
            string procedure = "AddComments_sp";
            string response = ExecuteProcedure(procedure, param);

            return response;
        }

        public string SetDriverForOrder(int? code, int? driverId)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Code", code);
            param.Add("@DriverId", driverId);
            string procedure = "SetDriverForOrder_sp";
            var response = ExecuteProcedure(procedure, param);

            return response;
        }
    }
}
