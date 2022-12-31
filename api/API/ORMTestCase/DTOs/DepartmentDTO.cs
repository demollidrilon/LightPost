using System;
using System.Collections.Generic;

namespace API.ORMTestCase.DTOs
{
    public class DepartmentDTO
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public string Name { get; set; }

        public DateTime FoundingDate { get; set; }

        public List<EmployeeDTO> Employees { get; set; }
    }
}
