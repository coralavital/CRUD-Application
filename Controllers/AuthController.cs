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

    [HttpPost(template: "register")]
    public IActionResult Register(RegisterDto dto)
    {
      // List<User> users = _repository.GetAllUsers();
      // int idCount;
      // if (users.Count() > 0)
      // {
      // 	idCount = users.Last().Id + 1;
      // }
      // else
      // {
      // 	idCount = 0;
      // }
      var user = new User
      {
        Username = dto.Username,
        Email = dto.Email,
        Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
      };

      try
      {
       var createResponse = _repository.Create(user);
        return Ok(new
        {
          user = createResponse,
        });
      }
      catch (Exception ex)
      {
        return BadRequest(error: new { message = "Username or email already exists", error = true });
      }

    }

    [HttpPost(template: "login")]
    public IActionResult Login(LoginDto dto)
    {
      var user = _repository.GetByUsername(dto.Username);

      if (user == null)
      {
        return BadRequest(error: new { message = "Invalid Nickname", error = true });
      }

      if (!BCrypt.Net.BCrypt.Verify(text: dto.Password, hash: user.Password))
      {
        return BadRequest(error: new { message = "Invalid Password", error = true });
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

    [HttpGet("user")]
    public IActionResult User()
    {
      try
      {
        var jwt = Request.Cookies["jwt"];

        var token = _jwtService.Verify(jwt);

        int userId = int.Parse(token.Issuer);

        var user = _repository.GetById(userId);

        return Ok(new
      {
        user,
      });
      }
      catch (Exception)
      {
        return Unauthorized();
      }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
      Response.Cookies.Delete("jwt");
      return Ok(new
      {
        message = "success"
      });
    }

    [HttpGet("allUsers")]
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
        message = "success"
      });
    }

    //[HttpPut("updateUser")]
    //public IActionResult UpdateUser(int id)
    //{
    //	_repository.UpdateUser(id);
    //	return Ok(new
    //	{
    //		message = "success"
    //	});
    //}
  }
}
