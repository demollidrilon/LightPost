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

        public List<LoginUser> GetUsers()
        {
            List<LoginUser> users;
            DynamicParameters param = new DynamicParameters();
            string procedure = "UsersSelect_sp";
            users = (List<LoginUser>)GetListSp<LoginUser>(procedure, param);

            return users;
        }

        public List<LoginUser> GetDrivers()
        {
            List<LoginUser> drivers;
            DynamicParameters param = new DynamicParameters();
            string procedure = "DriversSelect_sp";
            drivers = (List<LoginUser>)GetListSp<LoginUser>(procedure, param);

            return drivers;
        }

        public List<UserDetails> GetUserDetails(int? id)
        {
            List<UserDetails> userDetails;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", id);
            string procedure = "UserDetails_sp";
            userDetails = (List<UserDetails>)GetListSp<UserDetails>(procedure, param);

            return userDetails;
        }

        public string ChangeUserPassword(ChangePassword changePasswordModel)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", changePasswordModel.Id);
            param.Add("@Password", changePasswordModel.Password);
            string procedure = "ChangePassword_sp";
            var response = ExecuteProcedure(procedure, param);

            return response;
        }

        public string ChangeUserRole(UserRoleAndStatus userRoleAndStatus)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", userRoleAndStatus.Id);
            param.Add("@Role", userRoleAndStatus.Role);
            string procedure = "ChangeRole_sp";
            var response = ExecuteProcedure(procedure, param);

            return response;
        }

        public string ChangeUserStatus(UserRoleAndStatus userRoleAndStatus)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", userRoleAndStatus.Id);
            param.Add("@Enable", userRoleAndStatus.Status);
            string procedure = "ChangeStatus_sp";
            var response = ExecuteProcedure(procedure, param);

            return response;
        }
    }
}
