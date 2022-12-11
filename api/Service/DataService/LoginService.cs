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

        public LoginUser LoginUser(LoginUser loginUser)
        {
            LoginUser user;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Username", loginUser.Username);
            param.Add("@Password", loginUser.Password);
            string procedure = "UsersSelect_sp";
            user = GetObjectSp<LoginUser>(procedure, param);

            return user;
        }
    }
}
