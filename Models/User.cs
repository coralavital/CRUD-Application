using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace hometask.Models
{
	public class User
	{
		[Key]
		[MaxLength(20)]
		public string Username { get; set; } = string.Empty;
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int Id { get; set; }
		[Required]
		public string Email { get; set; } = string.Empty;
		[Required]
		[MaxLength(20)]
		[MinLength(6)]
		[JsonIgnore]
		public string Password { get; set; } = string.Empty;
	}
}
