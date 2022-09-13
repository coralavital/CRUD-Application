using Microsoft.AspNetCore.Mvc;
using hometask.Data;
using hometask.Dtos;
using hometask.Models;
using hometask.Helpers;
using System.Diagnostics;

namespace hometask.Controllers
{
	[Route(template: "api")]
	[ApiController]
	public class AuthController : Controller
	{
		private readonly IUserRepository _repository;
		private readonly JwtService _jwtService;
		public AuthController(IUserRepository repository, JwtService jwtService)
		{
			_repository = repository;
			_jwtService = jwtService;
		}
		// Http POST request for register a uaer
		[HttpPost("register")]
		public IActionResult Register(RegisterDto dto)
		{

			try
			{
				var user = new User
				{
					Username = dto.Username,
					Email = dto.Email,
					Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
				};

				if (_repository.GetByUsername(user.Username) != null)
				{
					return BadRequest(error: new { message = "The user already exist", error = true });
				}

				var createResponse = _repository.CreateUser(user);

				if (createResponse != null)
				{
					var address = new Address
					{
						UserAddress = dto.UserAddress
					};
					_repository.CreateAddress(address);
				}

				return Ok(new
				{
					user = createResponse,
				});

			}

			catch (Exception ex)
			{
				return BadRequest(error: new { message = ex.Message, error = true });
			}

		}

		// Http POST request for login a uaer
		[HttpPost("login")]
		public IActionResult Login(LoginDto dto)
		{
			var user = _repository.GetByUsername(dto.Username);

			if (user == null)
			{
				return BadRequest(error: new { message = "Invalid Username or Password", error = true });
			}

			if (!BCrypt.Net.BCrypt.Verify(text: dto.Password, hash: user.Password))
			{
				return BadRequest(error: new { message = "Invalid Username or Password", error = true });
			}

			var jwt = _jwtService.Generate(user.Id);

			Response.Cookies.Append(key: "jwt", value: jwt, new CookieOptions
			{
				HttpOnly = true
			});

			return Ok(new
			{
				user,
			});
		}

		// Http GST request to get the current user
		[HttpGet("currentUser")]
		public IActionResult currentUser()
		{
			try
			{
				var jwt = Request.Cookies["jwt"];

				var token = _jwtService.Verify(jwt);

				int userId = int.Parse(token.Issuer);

				var user = _repository.GetUserById(userId);

				return Ok(user);
			}
			catch (Exception)
			{
				return Unauthorized();
			}
		}

		// Http GET request for get addresses list
		[HttpGet("getAddresses")]
		public IActionResult getAddresses()
		{
			var addresses = _repository.GetAllAddresses();
			return Ok(addresses);
		}

		// Http POST request for logout user
		[HttpPost("logout")]
		public IActionResult Logout()
		{
			Response.Cookies.Delete("jwt");
			return Ok(new
			{
				message = "User logged out"
			});
		}

		// Http GET request for get users list
		[HttpGet("getAllUsers")]
		public IActionResult GetAllUsers()
		{
			var users = _repository.GetAllUsers();
			return Ok(users);
		}

		[HttpDelete("deleteUser")]
		public IActionResult DeleteUser(int id)

		{
			_repository.DeleteUser(id);
			return Ok(new
			{
				message = "User deleted"
			});
		}

		// Http PUT request for update user data
		[HttpPut("updateUser")]
		public IActionResult UpdateUser(UpdateDto dto)
		{
			if (_repository.GetByUsername(dto.Username) != null)
			{
				return BadRequest(error: new { message = "The username already exist", error = true });
			}
			Address address = _repository.GetAddressById(dto.Id);
			User user = _repository.GetUserById(dto.Id);
			user.Username = dto.Username;
			user.Email = dto.Email;
			address.UserAddress = dto.UserAddress;
			_repository.UpdateUser(user, address);
			return Ok(new
			{
				message = "User updated"
			});
		}
	}
}
