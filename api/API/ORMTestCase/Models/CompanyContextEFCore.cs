using Microsoft.EntityFrameworkCore;

namespace API.ORMTestCase.Models
{
    public partial class CompanyContextEFCore : DbContext
    {
        public virtual DbSet<Employee> Employee { get; set; }

        public virtual DbSet<Company> Company { get; set; }

        public virtual DbSet<Department> Departments { get; set; }

        public CompanyContextEFCore(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
                .HasMany(e => e.Departments);

            modelBuilder.Entity<Department>()
                .HasMany(e => e.Employees);
        }
    }
}
