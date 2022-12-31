using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.ORMTestCase.Models
{
    [Table("Company")]
    public partial class Company
    {
        public Company()
        {
            Departments = new HashSet<Department>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        public virtual ICollection<Department> Departments { get; set; }
    }
}
