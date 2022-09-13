using hometask.Models;
namespace hometask.Dtos
{
	// RegisterDto model to get from the frontend the register user details
	public class RegisterDto
	{
		public string Username { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string UserAddress { get; set; }
	}
}