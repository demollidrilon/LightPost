namespace API.ORMTestCase.DataAccess
{
    public interface ICaseSignature
    {
        long GetEmployeeByID(int id);

        long GetListByDepartmentID(int departmentId);

        long GetDepartmentListsForCompany(int companyId);
    }
}
