using Dapper;
using Service.DataService.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.DataService
{
    public class RolesService : DataAccess
    {
        public RolesService(string sqlConnection)
           : base(sqlConnection)
        { }

        public Roles GetRoles(int id)
        {
            Roles roles;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Id", id);
            string procedure = "RolesSelect_sp";
            roles = GetObjectSp<Roles>(procedure, param);

            return roles;
        }
    }
}
