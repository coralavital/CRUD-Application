using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using hometask.Models;

namespace hometask.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }

		public DbSet<Address> Addresses { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");
		public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
      		modelBuilder.Entity<User>().Property(t => t.Id).ValueGeneratedOnAdd().HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);
			modelBuilder.Entity<Address>().Property(t => t.Id).ValueGeneratedOnAdd().HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

		}
    }
}