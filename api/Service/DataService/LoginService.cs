using Dapper;
using Service.DataService.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService
{
    public class LoginService : DataAccess
    {
        public LoginService(string sqlConnection)
           : base(sqlConnection)
        { }

        public LoginUser Login(LoginUser model)
        {
            LoginUser user;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Username", model.Username);
            param.Add("@Password", model.Password);
            string procedure = "UsersSelect_sp";
            user = GetObjectSp<LoginUser>(procedure, param);

            return user;
        }
    }
}
