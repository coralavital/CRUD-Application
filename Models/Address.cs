using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hometask.Models
{
	// Address model 
	public class Address
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		[Required]
		public int UserId{ get; set; }
		[Required]
		public string UserAddress{ get; set; } = string.Empty;
	}
}
