using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;
using hometask.Models;

#nullable disable

namespace hometask.Data.Migrations
{
	public partial class CreateAddressesTable : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Addresses",
				columns: table => new
				{
					Id = table.Column<int>(type: "INTEGER", nullable: false).Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn).Annotation("Sqlite:Autoincrement", true),
					UserAddress = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),

				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Users", x => x.Id);
				});

		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Addresses");
		}
	}
}