using API.ORMTestCase.DTOs;
using System;
using System.Collections.Generic;

namespace API.ORMTestCase.TestData
{
    public static class Generator
    {

        public static List<EmployeeDTO> GenerateEmployees(int departmentId, int count)
        {
            List<EmployeeDTO> employees = new List<EmployeeDTO>();

            var allFirstNames = Data.GetFirstNames();
            var allLastNames = Data.GetLastNames();
            Random rand = new Random();
            DateTime start = new DateTime(1975, 1, 1);
            DateTime end = new DateTime(2001, 1, 1);

            for (int i = 0; i < count; i++)
            {
                EmployeeDTO employee = new EmployeeDTO();
                int newFirst = rand.Next(0, allFirstNames.Count - 1);
                employee.FirstName = allFirstNames[newFirst];
                int newLast = rand.Next(0, allLastNames.Count - 1);
                employee.LastName = allLastNames[newLast];
                employee.DateOfBirth = RandomDay(rand, start, end);
                employee.DepartmentId = departmentId;
                employee.Id = (((departmentId - 1) * count) + (i + 1));
                employees.Add(employee);
            }

            return employees;
        }

        public static List<DepartmentDTO> GenerateDepartments(int companyId, int count)
        {
            List<DepartmentDTO> departments = new List<DepartmentDTO>();

            var allDepartmentNames = Data.GetDepartmentNames();
            Random rand = new Random();
            DateTime start = new DateTime(1900, 1, 1);
            DateTime end = new DateTime(2016, 1, 1);

            for (int i = 0; i < count; i++)
            {
                DepartmentDTO department = new DepartmentDTO();
                int newDepartment = rand.Next(0, allDepartmentNames.Count - 1);
                department.Name = allDepartmentNames[newDepartment];
                department.FoundingDate = RandomDay(rand, start, end);
                department.CompanyId = companyId;
                department.Id = (((companyId - 1) * count) + (i + 1));
                departments.Add(department);
            }

            return departments;
        }

        public static List<CompanyDTO> GenerateCompanies(int count)
        {
            List<CompanyDTO> companies = new List<CompanyDTO>();
            var allCompaniesNames = Data.GetCompanyNames();
            Random rand = new Random();

            for (int i = 0; i < count; i++)
            {
                int newCompany = rand.Next(0, allCompaniesNames.Count - 1);
                companies.Add(new CompanyDTO()
                {
                    Name = allCompaniesNames[newCompany],
                    Id = i + 1
                });
            }

            return companies;
        }

        private static DateTime RandomDay(Random rand, DateTime start, DateTime end)
        {
            int range = (end - start).Days;
            return start.AddDays(rand.Next(range));
        }
    }
}
