using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hometask.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    UserAddress = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 1, "Tel Aviv", "386cac82-6654-4562-a452-bf780a904839" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 2, "Haifa", "c4e268cc-8e77-440e-a51e-b88b0a77d0ee" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 3, "Ashdod", "84728a5e-c0b5-4467-8f6e-af884aa62bf8" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 4, "Tel Aviv", "1dff4738-47d1-4c38-83f4-0993c0ed5875" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 5, "Ramat Gan", "3cfd81f3-caae-4732-8645-3d76bdbd0beb" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 6, "Tel Aviv", "f342113b-67df-4299-818d-5114eb969ccb" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 7, "Haifa", "09c4ea61-97ed-4225-b5c9-052655690450" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 8, "Ashdod", "ed7ff641-a42a-420a-a85b-bd8f15ba822b" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 9, "Tel Aviv", "a088d96e-18f6-4064-934f-dc9daa009a8d" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 10, "Ramat Gan", "ec7ab351-1b41-4099-8290-99b0a1ab661c" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "09c4ea61-97ed-4225-b5c9-052655690450", 0, "c49a9298-407d-41fb-933f-39b70c589957", "tami@gmail.com", false, true, null, "TAMI@GMAIL.COM", "TAMI VANUNU", "AQAAAAEAACcQAAAAEO+hpbVcfZcK6tYcNSzo7cdUTkEQN9pO4QRJZoju/zw0IbJ9sXrhU0EordoeI83ByA==", null, false, "97486803-f083-4312-8aaa-8672243627f3", false, "Tami Vanunu" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "1dff4738-47d1-4c38-83f4-0993c0ed5875", 0, "f677935b-8762-470a-aae7-7942bd9df034", "adir@gmail.com", false, true, null, "ADIR@GMAIL.COM", "ADIR ALFASI", "AQAAAAEAACcQAAAAEIg3O+XAoECoUNL38Bq9MvhKHOgaWKCqEV88b9ngqqzcmS16T30pYJBs8TeuH+s90g==", null, false, "e304077c-ceb6-4064-bcdd-917e6e66db9b", false, "Adir Alfasi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "386cac82-6654-4562-a452-bf780a904839", 0, "c21e8af9-9e67-4e38-9e34-c8eeb5c2595e", "coral@gmail.com", false, true, null, "CORAL@GMAIL.COM", "CORAL AVITAL", "AQAAAAEAACcQAAAAEHbMdIq9FTEjxKXU7ZCApEzJvZMWgFEPJWSX6l5uyJyGusJ2qg8NTYzS/VZqhCIluA==", null, false, "558096db-55ed-4084-b422-e45d58bc9a9a", false, "Coral Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "3cfd81f3-caae-4732-8645-3d76bdbd0beb", 0, "bb89ac61-35f1-43a6-865e-412ac35c860a", "amit@gmail.com", false, true, null, "AMIT@GMAIL.COM", "AMIT AVITAL", "AQAAAAEAACcQAAAAEDDohHmT5vONlev3Xkgp8B2Ura1IGzOodU+vQv8F0HBS2iFhRExntUg3hdpA04Wl1A==", null, false, "0403d7d6-75bf-4834-b29a-baefb3fcf519", false, "Amit Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "84728a5e-c0b5-4467-8f6e-af884aa62bf8", 0, "23685f6c-f5c4-4a1d-bd1d-a1a086b3eafe", "bar@gmail.com", false, true, null, "BAR@GMAIL.COM", "BAR AVITAL", "AQAAAAEAACcQAAAAEIrLG5gvj2x69IwFT4pfnpH9tbZ2Q4T33c+V7w8szYaYOFfUwP+8Icsaw2+yI20EFw==", null, false, "7287f2dc-8f83-48a1-ae65-df8c6520e463", false, "Bar Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "a088d96e-18f6-4064-934f-dc9daa009a8d", 0, "2bfc98dc-870a-4bcf-a886-b854aa8a57a6", "iris@gmail.com", false, true, null, "IRIS@GMAIL.COM", "IRIS AVITAL", "AQAAAAEAACcQAAAAEA7noejwuK+QVjsamFT13r+mtmb1tsuS1Xgig96TaHKsY+FegEYj+h5LE6a/m4LwUg==", null, false, "d85060d7-48a4-4a88-9c2c-53fbb0888355", false, "Iris Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "c4e268cc-8e77-440e-a51e-b88b0a77d0ee", 0, "a9434510-a0ff-4583-882d-f4d2987f3874", "rinat@gmail.com", false, true, null, "RINAT@GMAIL.COM", "RINAT ATIAS", "AQAAAAEAACcQAAAAEEo+M98k5IuSAIOqK3uC6EWeSnqWE+U8VWAYSPkoQYrjJK1W/iQpglcP0gK5B84OlQ==", null, false, "33226bf8-8396-45ee-8b3c-9261ba31168f", false, "Rinat Atias" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "ec7ab351-1b41-4099-8290-99b0a1ab661c", 0, "abc6a85a-0a91-493c-abf5-4dedb8fa84ca", "shir@gmail.com", false, true, null, "SHIR@GMAIL.COM", "SHIR LEVI", "AQAAAAEAACcQAAAAEKgHqWCdjWFKaNmrrjnQOzM0o0kqMukFnw+IPFScJw+1V9yme7sev1eLYeXvs/SUig==", null, false, "8f066c5b-9c80-4461-b177-190b453051ec", false, "Shir Levi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "ed7ff641-a42a-420a-a85b-bd8f15ba822b", 0, "89c29935-d36b-4437-ac5c-94c70721bad9", "eli@gmail.com", false, true, null, "ELI@GMAIL.COM", "ELI DAHAN", "AQAAAAEAACcQAAAAEJhu9Qeb6CHNtYkbkygwMtUb49+Lt/5jWeNeHrKhegkTMdZIpepToZavmQLrlqKfyw==", null, false, "c1dd07be-0ab1-4d92-b90f-018be1197810", false, "Eli Dahan" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "f342113b-67df-4299-818d-5114eb969ccb", 0, "f4e60cf1-ed6d-4844-84ea-b890b7ed684f", "tali@gmail.com", false, true, null, "TALI@GMAIL.COM", "TALI LEVI", "AQAAAAEAACcQAAAAEP9ehwPqPrM6s0EQo4Bv7dVzducd/txuMkKXQHJ3Wgz9VYVqOePPuBaxN1vCxBkXsQ==", null, false, "70704568-f30c-4642-9847-ced9f7f4adcc", false, "Tali Levi" });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
