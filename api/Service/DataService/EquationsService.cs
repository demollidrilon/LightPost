using Dapper;
using Service.DataService.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService
{
    public class EquationsService : DataAccess
    {
        public EquationsService(string sqlConnection)
           : base(sqlConnection)
        { }

        public string CreateEquation(int clientId)
        {
            string equationResponse;
            DynamicParameters param = new DynamicParameters();
            string procedure = "CreateEquation_sp";
            param.Add("@ClientId", clientId);
            equationResponse = ExecuteProcedure(procedure, param);

            return equationResponse;
        }

        public List<Equations> GetEquations(int? clientId)
        {
            List<Equations> equations;
            DynamicParameters param = new DynamicParameters();
            string procedure = "EquationsSelect_sp";
            param.Add("@ClientId", clientId);
            equations = (List<Equations>)GetListSp<Equations>(procedure, param);

            return equations;
        }

        public List<Orders> GetEquationOrders(int equationId)
        {
            List<Orders> orders;
            DynamicParameters param = new DynamicParameters();
            string procedure = "EquationOrdersSelect_sp";
            param.Add("@EquationId", equationId);
            orders = (List<Orders>)GetListSp<Orders>(procedure, param);

            return orders;
        }
    }
}
