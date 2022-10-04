using Dapper;
using Service.DataService.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService
{
    public class RegisterService : DataAccess
    {
        public RegisterService(string sqlConnection)
          : base(sqlConnection)
        { }

        public string Register(RegisterUser model)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Username", model.Username);
            param.Add("@Password", model.Password);
            param.Add("@Name", model.Password);
            param.Add("@Surname", model.Password);
            param.Add("@TelephoneNumber", model.TelephoneNumber);
            param.Add("@Address", model.Password);
            param.Add("@City", model.Password);
            string procedure = "UsersInsert_sp";
            var response = ExecuteProcedure(procedure, param);

            return response;
        }
    }
}
