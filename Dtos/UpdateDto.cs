using hometask.Models;

namespace hometask.Dtos
{
	// UpdateDto model to get from the frontend the update user details
	public class UpdateDto
	{
		public int Id { get; set; }
		public string Username { get; set; }
		public string Email { get; set; }
		public string UserAddress{ get; set; }
	}
}