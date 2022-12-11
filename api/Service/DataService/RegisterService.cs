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

        public string RegisterUser(RegisterUser registerUser)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Username", registerUser.Username);
            param.Add("@Password", registerUser.Password);
            param.Add("@Name", registerUser.Password);
            param.Add("@Surname", registerUser.Password);
            param.Add("@TelephoneNumber", registerUser.TelephoneNumber);
            param.Add("@Address", registerUser.Password);
            param.Add("@City", registerUser.Password);
            string procedure = "UsersInsert_sp";
            var response = ExecuteProcedure(procedure, param);

            return response;
        }
    }
}
