using API.ORMTestCase.DTOs;
using API.ORMTestCase.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.ORMTestCase.TestData
{
    public static class Database
    {
        public static void Reset()
        {
            using (CompanyContextEFCore context = new CompanyContextEFCore(GetOptions()))
            {
                context.Database.ExecuteSqlRaw("DELETE FROM Employee");
                context.Database.ExecuteSqlRaw("DELETE FROM Department");
                context.Database.ExecuteSqlRaw("DELETE FROM Company");
            }
        }

        public static void Fill(List<CompanyDTO> companies, List<DepartmentDTO> departments, List<EmployeeDTO> employees)
        {
            AddCompanies(companies);
            AddDepartments(departments);
            AddEmployees(employees);
        }

        private static void AddEmployees(List<EmployeeDTO> employees)
        {
            using (CompanyContextEFCore context = new CompanyContextEFCore(GetOptions()))
            {
                foreach (var employee in employees)
                {
                    context.Employee.Add(new Employee()
                    {
                        FirstName = employee.FirstName,
                        LastName = employee.LastName,
                        DateOfBirth = employee.DateOfBirth,
                        DepartmentId = employee.DepartmentId,
                        Id = employee.Id
                    });
                }

                context.SaveChanges();
            }
        }

        private static void AddDepartments(List<DepartmentDTO> departments)
        {
            using (CompanyContextEFCore context = new CompanyContextEFCore(GetOptions()))
            {
                foreach (var department in departments)
                {
                    context.Departments.Add(new Department()
                    {
                        Name = department.Name,
                        Id = department.Id,
                        CompanyId = department.CompanyId,
                        FoundingDate = department.FoundingDate
                    });
                }

                context.SaveChanges();
            }
        }

        private static void AddCompanies(List<CompanyDTO> companies)
        {
            using (CompanyContextEFCore context = new CompanyContextEFCore(GetOptions()))
            {
                foreach (var company in companies)
                {
                    context.Company.Add(new Company()
                    {
                        Id = company.Id,
                        Name = company.Name
                    });
                }

                context.SaveChanges();
            }
        }

        public static DbContextOptions GetOptions()
        {
            DbContextOptionsBuilder builder = new DbContextOptionsBuilder();
            builder.UseSqlServer(Constants.ORMTestCaseConnectionString);

            return builder.Options;
        }
    }
}
