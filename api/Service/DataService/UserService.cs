using Dapper;
using Service.DataService.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService
{
    public class UserService : DataAccess
    {
        public UserService(string sqlConnection)
          : base(sqlConnection)
        { }

        public List<UserDetails> UserDetails(int? id)
        {
            List<UserDetails> userDetails;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", id);
            string procedure = "UserDetails_sp";
            userDetails = (List<UserDetails>)GetListSp<UserDetails>(procedure, param);

            return userDetails;
        }

        public string ChangePassword(ChangePassword changePasswordModel)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", changePasswordModel.Id);
            param.Add("@Password", changePasswordModel.Password);
            string procedure = "ChangePassword_sp";
            var response = ExecuteProcedure(procedure, param);

            return response;
        }

    }
}
