using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using hometask.Models;
using hometask.Data;
using hometask.Dtos;
using System.Text;

namespace hometask.Controllers
{
	
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		public readonly AppDBContext _context;
		private SignInManager<IdentityUser> _signManager;
		private readonly UserManager<IdentityUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;

		public AuthController(UserManager<IdentityUser> userManager,
		  RoleManager<IdentityRole> roleManager,
		  IConfiguration configuration,
		  AppDBContext context,
		  SignInManager<IdentityUser> signManager)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_configuration = configuration;
			_context = context;
			_signManager = signManager;
		}
		// Http POST request for register a uaer
		[HttpPost("register")]
		public async Task<IActionResult> Register(RegisterDto dto)
		{
			var userExists = await _userManager.FindByEmailAsync(dto.Email);
			if (userExists != null)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
			}
			IdentityUser user = new()
			{
				Email = dto.Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = dto.Username,
			};
			Address address = new()
			{
				UserId = user.Id,
				UserAddress = dto.UserAddress
			};
			_context.Addresses.Add(address);
			_context.SaveChanges();
			var result = await _userManager.CreateAsync(user, dto.Password);
			if (result.Succeeded)
			{	
				var userRoles = await _userManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
		  			new Claim(ClaimTypes.Name, user.UserName),
					
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				};

				foreach (var userRole in userRoles)
				{
					authClaims.Add(new Claim(ClaimTypes.Role, userRole));
				}

				var token = GetToken(authClaims);

				await _signManager.SignInAsync(user, isPersistent: false);
				return Ok(new
				{
					user,
					token = new JwtSecurityTokenHandler().WriteToken(token),
					expiration = token.ValidTo
				});
			}
			return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });
		}

		//Http POST request for login a user
		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto dto)
		{
			var user = await _userManager.FindByEmailAsync(dto.Email);
			if (user != null && await _userManager.CheckPasswordAsync(user, dto.Password))
			{
				var userRoles = await _userManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
		  			new Claim(ClaimTypes.Name, user.UserName),
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				};

				foreach (var userRole in userRoles)
				{
					authClaims.Add(new Claim(ClaimTypes.Role, userRole));
				}

				var token = GetToken(authClaims);
				return Ok(new
				{
					user,
					token = new JwtSecurityTokenHandler().WriteToken(token),
					expiration = token.ValidTo
				});
			}
			return Unauthorized();
		}

		// Http POST request for logout user
		[HttpPost("logout")]
		public async Task<IActionResult> Logout()
		{
			await _signManager.SignOutAsync();
			return Ok(new
			{
				message = "User logged out"
			});
		}

		// Http GST request to get the current user
		[HttpGet("currentUser")]
		public async Task<IActionResult> getCurrentUser()
		{
			var token = Request.Headers["Authorization"];

			var handler = new JwtSecurityTokenHandler();

			if (handler.CanReadToken(token) == true)
			{
				var jsonToken = handler.ReadToken(token);
				var decodedJwt = jsonToken as JwtSecurityToken;

				if (decodedJwt.ValidTo > TimeZoneInfo.ConvertTimeToUtc(DateTime.Now))
				{
					var name = decodedJwt.Claims.Single(x => x.Type == ClaimTypes.Name).Value;
					var user = await _userManager.FindByNameAsync(name);

					return Ok(new
					{
						user,
					});
				}
				return BadRequest(error: new { message = "Token undefined", error = true });
			}
			else
			{
				return Ok(new
					{
						noCurrentMessage = "There is no token available"
					});
			}
		}


		//// Http GET request for get users list
		//[HttpGet("getAllUsers")]
		//public IActionResult GetAllUsers()
		//{
		//	var users = _context.Users.ToList();
		//	var addresses = _context.Addresses.ToList();
		//	if (users == null || addresses == null)
		//	{
		//		return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Users list founded failed!" });
		//	}
		//	return Ok(new { users, addresses });
		//}


		////[Authorize(Roles = "Admin")]
		//[HttpDelete("deleteUser")]
		//public async Task<IActionResult> DeleteUser(string id)
		//{
		//	var user = await _userManager.FindByIdAsync(id);
		//	Address address = _context.Addresses.FirstOrDefault(address => address.UserId == id);
		//	_context.Addresses.Remove(address);
		//	_context.SaveChanges();
		//	var result = await _userManager.DeleteAsync(user);
		//	if (result == null)
		//		return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Users list founded failed!" });
		//	return Ok(new
		//	{
		//		message = "User deleted successfully"
		//	});
		//}

		////[Authorize(Roles = "Admin")]
		//// Http PUT request for update user data
		//[HttpPut("updateUser")]
		//public async Task<IActionResult> UpdateUser(UpdateDto dto)
		//{
		//	Address address = _context.Addresses.FirstOrDefault(address => address.UserId == dto.Id);
		//	IdentityUser user = await _userManager.FindByIdAsync(dto.Id);
		//	user.UserName = dto.UserName;
		//	address.UserAddress = dto.UserAddress;
		//	if (user != null)
		//	{
		//		_context.Addresses.Update(address);
		//		_context.Users.Update(user);
		//		_context.SaveChanges();
		//		return Ok(new
		//		{
		//			message = "User updated"
		//		});
		//	}
		//	return BadRequest(error: new { message = "There is a problem to update", error = true });
		//}

		// GetToken of logged in user
		private JwtSecurityToken GetToken(List<Claim> authClaims)
		{
			var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

			var token = new JwtSecurityToken(
			  issuer: _configuration["JWT:ValidIssuer"],
			  audience: _configuration["JWT:ValidAudience"],
			  expires: TimeZoneInfo.ConvertTimeToUtc(DateTime.Now.AddHours(3)),
			  claims: authClaims,
			  signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
			  );

			return token;
		}
	}
}