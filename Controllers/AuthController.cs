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
					Email = dto.Email,
					Username = dto.Username,
					Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
				};

				if (_repository.GetByEmail(user.Email) != null)
				{
					return BadRequest(error: new { message = "The email already exist", error = true });
				}

				var newUser = _repository.CreateUser(user);

				if (newUser != null)
				{
					var address = new Address
					{
						UserId = newUser.Id,
						UserAddress = dto.UserAddress,
					};
					_repository.CreateAddress(address);
					var jwt = _jwtService.Generate(newUser.Id);
					Response.Cookies.Append(key: "jwt", value: jwt, new CookieOptions
					{
						HttpOnly = true
					});

					return Ok(new
					{
						user = newUser,
						jwt
					});
				}

				else
				{
					return BadRequest(error: new { message = "Coldn't create new user", error = true });
				}
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
			var user = _repository.GetByEmail(dto.Email);

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
				jwt
			});
		}

		// Http GST request to get the current user
		[HttpGet("currentUser")]
		public IActionResult currentUser()
		{
			try
			{
				var jwt = Request.Headers["jwt"];
				Console.WriteLine(jwt);
				var decodedJwt = _jwtService.Verify(jwt);
				Console.WriteLine(decodedJwt);

				int userId = int.Parse(decodedJwt.Issuer);

				if (decodedJwt.ValidTo > TimeZoneInfo.ConvertTimeToUtc(DateTime.Now))
				{
					var user = _repository.GetUserById(userId);

					return Ok(new
					{
						user,
						jwt
					});
				}
				else
				{
					return BadRequest(error: new { message = "Token expired", error = true });
				}
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
			Address address = _repository.GetAddressById(dto.Id);
			User user = _repository.GetUserById(dto.Id);
			user.Username = dto.Username;
			address.UserAddress = dto.UserAddress;
			if (_repository.UpdateUser(user, address))
			{
				return Ok(new
				{
					message = "User updated"
				});
			}
			return BadRequest(error: new { message = "There is a problem to update", error = true });
		}
	}
}
