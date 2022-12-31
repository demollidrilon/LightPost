using API.ORMTestCase.DTOs;
using Dapper;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;

namespace API.ORMTestCase.DataAccess
{
    public class Dapper : ICaseSignature
    {
        public long GetEmployeeByID(int id)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            using (SqlConnection conn = new SqlConnection(Constants.ORMTestCaseConnectionString))
            {
                conn.Open();
                var employee = conn.QuerySingle<EmployeeDTO>("SELECT Id, FirstName, LastName, DateOfBirth, DepartmentId FROM Employee WHERE Id = @ID", new { ID = id });
            }
            watch.Stop();
            return watch.ElapsedMilliseconds;
        }

        public long GetListByDepartmentID(int departmentId)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            using (SqlConnection conn = new SqlConnection(Constants.ORMTestCaseConnectionString))
            {
                conn.Open();
                var department = conn.QuerySingle<DepartmentDTO>("SELECT Id, Name, CompanyId, FoundingDate FROM Department WHERE ID = @id", new { id = departmentId });

                department.Employees = conn.Query<EmployeeDTO>("SELECT Id, FirstName, LastName, DateOfBirth, DepartmentId FROM Employee WHERE DepartmentId = @ID", new { ID = departmentId }).ToList();
            }
            watch.Stop();
            return watch.ElapsedMilliseconds;
        }

        public long GetDepartmentListsForCompany(int companyId)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            using (SqlConnection conn = new SqlConnection(Constants.ORMTestCaseConnectionString))
            {
                conn.Open();
                var departments = conn.Query<DepartmentDTO>("SELECT ID, Name, CompanyId, FoundingDate FROM Department WHERE CompanyId = @ID", new { ID = companyId });

                var departmentIDs = departments.Select(x => x.Id).ToList();

                var employees = conn.Query<EmployeeDTO>("SELECT ID, FirstName, LastName, DateOfBirth, DepartmentId FROM Employee WHERE DepartmentId IN @IDs", new { IDs = departmentIDs });

                foreach (var department in departments)
                {
                    department.Employees = employees.Where(x => x.DepartmentId == department.Id).ToList();
                }
            }
            watch.Stop();
            return watch.ElapsedMilliseconds;
        }
    }
}
