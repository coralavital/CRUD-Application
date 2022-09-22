using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;
using hometask.Models;

namespace hometask.Data
{
	public class AppDBContext : IdentityDbContext<IdentityUser>
	{
		public DbSet<Address> Addresses { get; set; }
		// Users table

		public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
		{

		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

			modelBuilder.Entity<Address>().Property(t => t.Id).ValueGeneratedOnAdd().HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

			// Seeding data
			string[] names = { "coral", "rinat", "bar", "adir", "amit" };
			string[] addresses = { "Tel Aviv", "Haifa", "Ashdod", "Tel Aviv", "Ramat Gan" };
			IdentityUser[] usersToSeed = new IdentityUser[5];
			Address[] addressesToSeed = new Address[5];

			for (int i = 1; i <= 5; i++)
			{
				var user = new IdentityUser
				{
					Email = $"{names[i - 1]}@gmail.com",
					NormalizedEmail = $"{names[i - 1]}@gmail.com".ToUpper(),
					SecurityStamp = Guid.NewGuid().ToString(),
					UserName = $"{names[i - 1]}",
					NormalizedUserName = $"{names[i - 1]}".ToUpper(),
					LockoutEnabled = true,
				};
				PasswordHasher<IdentityUser> passwordHasher = new PasswordHasher<IdentityUser>();
				user.PasswordHash = passwordHasher.HashPassword(user, "123456");

				usersToSeed[i - 1] = user;

				addressesToSeed[i - 1] = new Address
				{
					Id = i,
					UserId = usersToSeed[i - 1].Id,
					UserAddress = $"{addresses[i - 1]}"
				};
			}

			modelBuilder.Entity<Address>().HasData(addressesToSeed);
			modelBuilder.Entity<IdentityUser>().HasData(usersToSeed);
			base.OnModelCreating(modelBuilder);
		}
	}
}
