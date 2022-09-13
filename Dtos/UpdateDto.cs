using hometask.Models;

namespace hometask.Dtos
{
	public class UpdateDto
	{
		public int Id { get; set; }
		public string Username { get; set; }
		public string Email { get; set; }
		//public Address? UserAddress{ get; set; }
	}
}