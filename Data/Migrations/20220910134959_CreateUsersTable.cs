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
					Username = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
					Id = table.Column<int>(type: "INTEGER", nullable: false).Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn).Annotation("Sqlite:Autoincrement", true),
					Email = table.Column<string>(type: "TEXT", nullable: false),
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
				unique: true);

			migrationBuilder.CreateIndex(
				name: "IX_Users_Email",
				table: "Users",
				column: "Email",
				unique: false);

		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Users");
		}
	}
}