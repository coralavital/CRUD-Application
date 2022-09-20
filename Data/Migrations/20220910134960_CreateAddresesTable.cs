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
					UserId = table.Column<int>(type: "INTEGER", nullable: false),
					UserAddress = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Addresses", x => x.Id);
				});
			
			migrationBuilder.CreateIndex(
				name: "IX_Addresses_UserId",
				table: "Addresses",
				column: "UserId",
				unique: true
			);

			// Seeding data for Addresses table
			migrationBuilder.InsertData(
				table: "Addresses",
				columns: new[] { "Id", "UserId", "UserAddress" },
				values: new object[] { 1, 1, "Ashdod" }
			);

			migrationBuilder.InsertData(
				table: "Addresses",
				columns: new[] { "Id", "UserId", "UserAddress" },
				values: new object[] { 2, 2, "Tel Aviv" }
			);

			migrationBuilder.InsertData(
				table: "Addresses",
				columns: new[] { "Id", "UserId", "UserAddress" },
				values: new object[] { 3, 3, "Haifa" }
			);

			migrationBuilder.InsertData(
				table: "Addresses",
				columns: new[] { "Id", "UserId", "UserAddress" },
				values: new object[] { 4, 4, "Ashdod" }
			);

			migrationBuilder.InsertData(
				table: "Addresses",
				columns: new[] { "Id", "UserId", "UserAddress" },
				values: new object[] { 5, 5, "Tel Aviv" }
			);
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "Addresses");
		}
	}
}