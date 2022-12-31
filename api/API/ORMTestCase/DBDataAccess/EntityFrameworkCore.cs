using API.ORMTestCase.Models;
using API.ORMTestCase.TestData;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq;

namespace API.ORMTestCase.DataAccess
{
    public class EntityFrameworkCore : ICaseSignature
    {
        public long GetEmployeeByID(int id)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            using (CompanyContextEFCore context = new CompanyContextEFCore(Database.GetOptions()))
            {
                var employee = context.Employee.First(x => x.Id == id);
            }
            watch.Stop();
            return watch.ElapsedMilliseconds;
        }

        public long GetListByDepartmentID(int departmentId)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            using (CompanyContextEFCore context = new CompanyContextEFCore(Database.GetOptions()))
            {
                var employees = context.Departments.Include(x => x.Employees).AsNoTracking().Single(x => x.Id == departmentId);
            }
            watch.Stop();
            return watch.ElapsedMilliseconds;
        }

        public long GetDepartmentListsForCompany(int companyId)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            using (CompanyContextEFCore context = new CompanyContextEFCore(Database.GetOptions()))
            {
                var employees = context.Departments.Include(x => x.Employees).Where(x => x.CompanyId == companyId).AsNoTracking().ToList();
            }
            watch.Stop();
            return watch.ElapsedMilliseconds;
        }
    }
}
