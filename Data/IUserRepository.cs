using hometask.Models;
using hometask.Data;

namespace hometask.Data
{
	public interface IUserRepository
	{
		// Create new user
		User CreateUser(User user);
		// Create new address
		Address CreateAddress(Address address);
		// Get user by username
		User GetByUsername(string username);
		// Get user by id
		User GetUserById(int id);
		// Get address by id
		Address GetAddressById(int id);
		// Get all users list
		List<User> GetAllUsers();
		// Delete existing user
		bool DeleteUser(int id);
		// Update user details
		bool UpdateUser(User user, Address address);
		// Get all addresses list
		List<Address> GetAllAddresses();
	}
}