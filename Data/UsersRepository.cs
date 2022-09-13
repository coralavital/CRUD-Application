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

		// Create a new user
		public User CreateUser(User user)
		{
			_context.Users.Add(user);
			_context.SaveChanges();
			return user;
		}

		// Create a new address
		public Address CreateAddress(Address address)
		{
			_context.Addresses.Add(address);
			_context.SaveChanges();
			return address;
		}

		// Get user by username
		public User GetByUsername(string username)
		{
			return  _context.Users.FirstOrDefault(user => user.Username == username);
		}

		// Get user by id
		public User GetUserById(int id)
		{
			return _context.Users.FirstOrDefault(user => user.Id == id);
		}

		// Get address by id
		public Address GetAddressById(int id)
		{
			return _context.Addresses.FirstOrDefault(address => address.Id == id);
		}

		// Get all users list
		public List<User> GetAllUsers()
		{
			return _context.Users.ToList();
		}

		// Delete existing user
		public bool DeleteUser(int id)
		{
			Address address = GetAddressById(id);
			_context.Addresses.Remove(address);
			_context.SaveChanges();

			User user = GetUserById(id);
			_context.Users.Remove(user);

			_context.SaveChanges();
			return true;
		}

		// Update a user details
		public bool UpdateUser(User user, Address address)
		{
			_context.Addresses.Update(address);
			_context.Users.Update(user);
			_context.SaveChanges();
			return true;
		}

		// Get all addresses list
		public List<Address> GetAllAddresses()
		{
			return _context.Addresses.ToList();
		}
	}
}