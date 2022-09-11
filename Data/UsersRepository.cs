using hometask.Models;

namespace hometask.Data
{
	public class UserRepository : IUserRepository
	{

		public readonly AppDBContext _context;

		public UserRepository(AppDBContext context)
		{
			_context = context;
		}

		public User Create(User user)
		{
			_context.Users.Add(user);
			_context.SaveChanges();
			return user;
		}

		public User GetByUsername(string username)
		{
			return _context.Users.FirstOrDefault(user => user.Username == username);
		}

		public User GetById(int id)
		{
			return _context.Users.FirstOrDefault(user => user.Id == id);
		}

		public List<User> GetAllUsers()
		{
			return _context.Users.ToList();
		}

		public void DeleteUser(int id)
		{
			User user = GetById(id);
			_context.Users.Remove(user);
			_context.SaveChanges();
		}

		//public void UpdateUser(int id)
		//{
		//	User user = GetById(id);
		//	_context.Users.Update(user);
		//	_context.SaveChanges();
		//}
	}
}