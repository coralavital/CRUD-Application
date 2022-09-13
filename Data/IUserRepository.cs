using hometask.Models;
using hometask.Data;

namespace hometask.Data
{
	public interface IUserRepository
	{
		User CreateUser(User user);
		Address CreateAddress(Address address);
		User GetByUsername(string username);
		User GetUserById(int id);
		Address GetAddressById(int id);
		List<User> GetAllUsers();
		bool DeleteUser(int id);
		bool UpdateUser(User user, Address address);
		List<Address> GetAllAddresses();
	}
}