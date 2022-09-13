﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using hometask.Data;

#nullable disable

namespace hometask.Data.Migrations
{
	[DbContext(typeof(AppDBContext))]
	[Migration("20220910134960_CreateAddressesTable")]
	partial class CreateAddressesTable
	{
		protected override void BuildTargetModel(ModelBuilder modelBuilder)
		{
#pragma warning disable 612, 618
			modelBuilder.HasAnnotation("ProductVersion", "6.0.8");

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
