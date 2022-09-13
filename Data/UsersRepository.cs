using hometask.Models;
using hometask.Data;

namespace hometask.Data
{
	public class UserRepository : IUserRepository
	{

		public readonly AppDBContext _context;

		public UserRepository(AppDBContext context)
		{
			_context = context;
		}

		public User CreateUser(User user)
		{
			_context.Users.Add(user);
			_context.SaveChanges();
			return user;
		}

		public Address CreateAddress(Address address)
		{
			_context.Addresses.Add(address);
			_context.SaveChanges();
			return address;
		}

		public User GetByUsername(string username)
		{
			return _context.Users.FirstOrDefault(user => user.Username == username);
		}

		public User GetUserById(int id)
		{
			return _context.Users.FirstOrDefault(user => user.Id == id);
		}

		public Address GetAddressById(int id)
		{
			return _context.Addresses.FirstOrDefault(address => address.Id == id);
		}

		public List<User> GetAllUsers()
		{
			return _context.Users.ToList();
		}

		public bool DeleteUser(int id)
		{
			Address address = GetAddressById(id);
			_context.Addresses.Remove(address);

			User user = GetUserById(id);
			_context.Users.Remove(user);
			
			_context.SaveChanges();
			return true;
		}

		public bool UpdateUser(User user)
		{
			_context.Users.Update(user);
			_context.SaveChanges();
			return true;
		}

		public List<Address> GetAllAddresses()
		{
			return _context.Addresses.ToList();
		}
	}
}