import bcrypt from 'bcryptjs';

class Users {
  constructor() {
    this.users = [];
  }

  signup(data) {
    const newUser = {
      id: this.users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: bcrypt.hashSync(data.password),
      isAdmin: data.isAdmin,
      type: data.type,
    };
    this.users.push(newUser);
    return newUser;
  }
}
export default new Users();
