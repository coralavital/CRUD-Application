using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;
using hometask.Models;

#nullable disable

namespace hometask.Data.Migrations
{
	public partial class CreateUsersTable : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Users",
				columns: table => new
				{
					Id = table.Column<int>(type: "INTEGER", nullable: false).Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn).Annotation("Sqlite:Autoincrement", true),
					Email = table.Column<string>(type: "TEXT", nullable: false),
					Username = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
					Password = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),

				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Users", x => x.Id);
				});

			migrationBuilder.CreateIndex(
				name: "IX_Users_Username",
				table: "Users",
				column: "Username",
				unique: false
			);

			migrationBuilder.CreateIndex(
				name: "IX_Users_Email",
				table: "Users",
				column: "Email",
				unique: true
			);

			// Seeding data for Users table
			migrationBuilder.InsertData(
				table: "Users",
				columns: new[] { "Id", "Email", "Username", "Password" },
				values: new object[] { 1, "coral@gmail.com", "coral", BCrypt.Net.BCrypt.HashPassword("123456") }
			);

			migrationBuilder.InsertData(
				table: "Users",
				columns: new[] { "Id", "Email", "Username", "Password" },
				values: new object[] { 2, "adir@gmail.com", "adir", BCrypt.Net.BCrypt.HashPassword("123456") }
			);

			migrationBuilder.InsertData(
				table: "Users",
				columns: new[] { "Id", "Email", "Username", "Password" },
				values: new object[] { 3, "bar@gmail.com", "bar", BCrypt.Net.BCrypt.HashPassword("123456") }
			);

			migrationBuilder.InsertData(
				table: "Users",
				columns: new[] { "Id", "Email", "Username", "Password" },
				values: new object[] { 4, "rinat@gmail.com", "rinat", BCrypt.Net.BCrypt.HashPassword("123456") }
			);

			migrationBuilder.InsertData(
				table: "Users",
				columns: new[] { "Id", "Email", "Username", "Password" },
				values: new object[] { 5, "ido@gmail.com", "ido", BCrypt.Net.BCrypt.HashPassword("123456") }
			);

		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Users");
		}
	}
}