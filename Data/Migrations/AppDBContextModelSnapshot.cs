﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using hometask.Data;

#nullable disable

namespace hometask.Data.Migrations
{
	[DbContext(typeof(AppDBContext))]
	partial class AppDBContextModelSnapshot : ModelSnapshot
	{
		protected override void BuildModel(ModelBuilder modelBuilder)
		{
#pragma warning disable 612, 618
			modelBuilder.HasAnnotation("ProductVersion", "6.0.8");

			modelBuilder.Entity("hometask.Models.User", b =>
				{
					b.Property<string>("Username")
						.HasMaxLength(20)
						.IsRequired()
						.HasColumnType("TEXT");

					b.Property<string>("Email")
						.IsRequired()
						.HasColumnType("TEXT");

					b.Property<int>("Id")
						.HasColumnType("INTEGER");

					b.Property<string>("Password")
						.IsRequired()
						.HasMaxLength(20)
						.HasColumnType("TEXT");

					b.HasKey("Username");

					b.HasIndex("Username")
						.IsUnique();

					b.ToTable("Users");
				});

				modelBuilder.Entity("hometask.Models.Address", b =>
				{
					b.Property<string>("UserAddress")
						.IsRequired()
						.HasColumnType("TEXT");
						
					b.Property<int>("Id")
						.HasColumnType("INTEGER");

					b.ToTable("Addresses");
				});
#pragma warning restore 612, 618
		}
	}
}