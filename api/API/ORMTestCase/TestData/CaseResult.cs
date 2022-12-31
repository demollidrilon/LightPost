namespace API.ORMTestCase.TestData
{
    public class CaseResult
    {
        public double EmployeeByIDMs { get; set; }

        public double EmployeeForDepartmentMs { get; set; }

        public double DepartmentsForCompanyMs { get; set; }

        public Framework FrameworkId { get; set; }

        public string FrameWorkName { get; set; }

        public int RunNr { get; set; }
    }

    public enum Framework
    {
        EntityFrameworkCore,
        Dapper
    }
}
