using hometask.Models;

namespace hometask.Data
{
	public interface IUserRepository
	{
		User Create(User user);
		User GetByUsername(string username);
		User GetById(int id);
		List<User> GetAllUsers();
		void DeleteUser(int id);
		//void UpdateUser(int id);
	}
}