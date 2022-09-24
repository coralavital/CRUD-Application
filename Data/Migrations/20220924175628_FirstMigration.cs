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
                values: new object[] { 1, "Tel Aviv", "4e492d27-6e67-4125-a003-4c6869f9d002" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 2, "Haifa", "246475f6-52fe-4e5e-844f-148abe1469db" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 3, "Ashdod", "d14bad1f-3d13-4323-8fc5-757ad491b1fd" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 4, "Tel Aviv", "4ad889fd-426d-4507-9f7b-cee94e347b80" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 5, "Ramat Gan", "2da2b428-bc36-49e9-b532-2d6f5bbbf72d" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 6, "Tel Aviv", "c8de0e79-cee5-43aa-8bef-3deb75895f33" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 7, "Haifa", "8135b464-55d7-4121-82cb-716e7ef12204" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 8, "Ashdod", "66b2e64b-94ae-4ee6-bc04-5da919b0e02b" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 9, "Tel Aviv", "55d2df88-b2d8-4817-b6f2-71aabf528215" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 10, "Ramat Gan", "caad0356-1e37-4c7f-b320-7254ee074f02" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "246475f6-52fe-4e5e-844f-148abe1469db", 0, "af952e07-119e-449d-99c9-4d6cd45fc454", "rinat@gmail.com", false, true, null, "RINAT@GMAIL.COM", "RINAT ATIAS", "AQAAAAEAACcQAAAAELh+9IQXeHWOXxjHye3GDk9atqka+cDmjLCY8V/MQ/+7Yxy8JsD2GCntbcYUiTC1tw==", null, false, "e29af502-9131-4626-9fa0-1c1f1c7f7258", false, "Rinat Atias" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "2da2b428-bc36-49e9-b532-2d6f5bbbf72d", 0, "b120beda-704b-42cb-9bad-beb634ef66cf", "amit@gmail.com", false, true, null, "AMIT@GMAIL.COM", "AMIT AVITAL", "AQAAAAEAACcQAAAAEKOHL6qFUC3ahzhk6VeaK5DkAkgXFoGVgHXywwApjyrJ84krBgVmIdDGZ+FOql3h0Q==", null, false, "9d0e29a0-7f48-4765-a6ca-fc6f22b0054d", false, "Amit Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "4ad889fd-426d-4507-9f7b-cee94e347b80", 0, "ea064713-ce31-477c-a083-e2e393f590f5", "adir@gmail.com", false, true, null, "ADIR@GMAIL.COM", "ADIR ALFASI", "AQAAAAEAACcQAAAAEC27UsOYM8I8NtUZ1L9oDv52wUfPCMaLe4bxX16UwjJMGIiN40lC99wQDwRsxC2dGA==", null, false, "98050e26-fc3d-4a48-9870-8562070e9cbc", false, "Adir Alfasi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "4e492d27-6e67-4125-a003-4c6869f9d002", 0, "d9137042-732a-4e4a-b55c-f9468198c181", "coral@gmail.com", false, true, null, "CORAL@GMAIL.COM", "CORAL AVITAL", "AQAAAAEAACcQAAAAEN408GU5lB6NOq+nEZich1kSr8hHooCRsijSmceGKOcjQwuykNR20H9KmhyBo1bKkw==", null, false, "a4ffb620-3cd8-4fd0-a732-bcaf8d2f4c8b", false, "Coral Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "55d2df88-b2d8-4817-b6f2-71aabf528215", 0, "b6b8cc1f-b4cc-42c9-9c33-6766a27cc200", "iris@gmail.com", false, true, null, "IRIS@GMAIL.COM", "IRIS AVITAL", "AQAAAAEAACcQAAAAEC7jYGdrRYVNXHREs4oZXBGvXaNZoKd/FT9dDqeMv0ETWPjWY3AWszasPmIhwxOEVQ==", null, false, "872d83a8-5601-479d-9975-784bb8cfa9fe", false, "Iris Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "66b2e64b-94ae-4ee6-bc04-5da919b0e02b", 0, "8fc51ddd-850f-4abc-9830-149fe9f203ac", "eli@gmail.com", false, true, null, "ELI@GMAIL.COM", "ELI DAHAN", "AQAAAAEAACcQAAAAEM0XI0tyI2akfdEKBwl4IzqIxw6zaFb3NBo2HOSE24HsaiJff3TUydF6nZMeiWDFNw==", null, false, "d5b840b4-6894-438e-b7f7-0224ed96bbfe", false, "Eli Dahan" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "8135b464-55d7-4121-82cb-716e7ef12204", 0, "7543d889-d517-4663-a8ae-d96e422fa302", "tami@gmail.com", false, true, null, "TAMI@GMAIL.COM", "TAMI VANUNU", "AQAAAAEAACcQAAAAEMEGSLC+GMt7G5tOsG0RfosWxjUDcsMJrw52PoIExCsl02tonOLKT25ZyYoNjUZNDQ==", null, false, "f229258d-c52d-4722-8672-ec094359cdb0", false, "Tami Vanunu" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "c8de0e79-cee5-43aa-8bef-3deb75895f33", 0, "44216919-161f-4bd8-8d9c-d855f9f33b05", "tali@gmail.com", false, true, null, "TALI@GMAIL.COM", "TALI LEVI", "AQAAAAEAACcQAAAAEIFL5XFeFAhemVR1cI9zkbbZn1U2EBrM0modPQrtzVMLvVY+7iR8FWj3DzN6RvcoqA==", null, false, "fe0cbc71-869c-41ab-8ece-ccd7eb3444fd", false, "Tali Levi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "caad0356-1e37-4c7f-b320-7254ee074f02", 0, "430d802b-26f6-423b-a309-ba59891eaa6d", "shir@gmail.com", false, true, null, "SHIR@GMAIL.COM", "SHIR LEVI", "AQAAAAEAACcQAAAAECY9w3HGMyqO9hNcLqRytLYETlSabDyFVCB2tpma4EizKIJhBwZicH2pc3L4+Bqjzg==", null, false, "4fd26653-3f08-4e54-9ec0-ed136b05197f", false, "Shir Levi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "d14bad1f-3d13-4323-8fc5-757ad491b1fd", 0, "05ce7d9e-cb58-4bd1-8d96-60de1a990ec8", "bar@gmail.com", false, true, null, "BAR@GMAIL.COM", "BAR AVITAL", "AQAAAAEAACcQAAAAEFd10jPVNzUNj9rztjHNK1somnyIwdlSWKbMaG0acEWFFHG6tuNPt1gYVU9JquTHHQ==", null, false, "8d43ae57-0fc8-430a-85aa-19128200643a", false, "Bar Avital" });

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
