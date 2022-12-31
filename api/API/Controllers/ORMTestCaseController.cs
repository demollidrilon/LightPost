using API.ORMTestCase.DataAccess;
using API.ORMTestCase.DTOs;
using API.ORMTestCase.TestData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ORMTestCaseController : ControllerBase
    {
        public static int NrRuns { get; set; }
        public static int NrEmployees { get; set; }
        public static int NrDepartments { get; set; }
        public static int NrCompanies { get; set; }

        [HttpPost]
        public IActionResult Init(int nrOfRuns, int nrOfCompaniesPerRun, int nrOfDepartmentsPerCompany, int nrOfEmployeesPerDepartment)
        {
            NrRuns = nrOfRuns;
            NrCompanies = nrOfCompaniesPerRun;
            NrDepartments = nrOfDepartmentsPerCompany;
            NrEmployees = nrOfEmployeesPerDepartment;
            List<CaseResult> caseResults = new List<CaseResult>();
            List<CompanyDTO> companies = Generator.GenerateCompanies(NrCompanies);
            List<DepartmentDTO> departments = new List<DepartmentDTO>();
            List<EmployeeDTO> employees = new List<EmployeeDTO>();

            foreach (var company in companies)
            {
                var newDepartments = Generator.GenerateDepartments(company.Id, NrDepartments);
                departments.AddRange(newDepartments);
                foreach (var department in newDepartments)
                {
                    var newEmployees = Generator.GenerateEmployees(department.Id, NrEmployees);
                    employees.AddRange(newEmployees);
                }
            }

            Database.Reset();
            Database.Fill(companies, departments, employees);

            for (int i = 0; i < NrRuns + 1; i++)
            {
                ORMTestCase.DataAccess.Dapper dapperTest = new ORMTestCase.DataAccess.Dapper();
                caseResults.AddRange(RunCases(i, Framework.Dapper, dapperTest, "Dapper"));

                EntityFrameworkCore efCoreTest = new EntityFrameworkCore();
                caseResults.AddRange(RunCases(i, Framework.EntityFrameworkCore, efCoreTest, "EntityFrameworkCore"));
            }
            return Ok(caseResults);
        }

        public static List<CaseResult> RunCases(int runNr, Framework frameworkId, ICaseSignature caseSignature, string frameWorkName)
        {
            List<CaseResult> caseResults = new List<CaseResult>();
            CaseResult caseResult = new CaseResult()
            {
                RunNr = runNr,
                FrameworkId = frameworkId,
                FrameWorkName = frameWorkName
            };

            List<long> employeeByIDCaseResults = new List<long>();
            for (int i = 1; i <= NrEmployees; i++)
                employeeByIDCaseResults.Add(caseSignature.GetEmployeeByID(i));
            caseResult.EmployeeByIDMs = Math.Round(employeeByIDCaseResults.Average(), 3);

            List<long> employeesForDepartmentCaseResults = new List<long>();
            for (int i = 1; i <= NrDepartments; i++)
                employeesForDepartmentCaseResults.Add(caseSignature.GetListByDepartmentID(i));
            caseResult.EmployeeForDepartmentMs = Math.Round(employeesForDepartmentCaseResults.Average(), 3);

            List<long> departmentsForCompanyCaseResults = new List<long>();
            for (int i = 1; i <= NrCompanies; i++)
                departmentsForCompanyCaseResults.Add(caseSignature.GetDepartmentListsForCompany(i));
            caseResult.DepartmentsForCompanyMs = Math.Round(departmentsForCompanyCaseResults.Average(), 3);

            caseResults.Add(caseResult);

            return caseResults;
        }
    }
}
