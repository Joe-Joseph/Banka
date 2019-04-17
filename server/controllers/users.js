import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validate from '../helpers/user-validation';
import UsersModel from '../model/user';

const Users = {
  signup(req, res) {
    // Validate user inputs
    const { error } = validate.validateUser(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    // Check whether the entered email does not exist
    let user = UsersModel.users.find(username => username.email === req.body.email);
    if (user) return res.status(400).json({ status: 400, error: 'Email already registered' });

    user = UsersModel.signup(req.body);
    const generate = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
    };

    const token = jwt.sign(generate, 'YOU_OWN_YOUR_OWN', { expiresIn: '24h' });
    return res.header('Authorization', token).status(201).json({
      status: 201,
      message: 'Registered successfully',
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  },

  login(req, res) {
    // Validating user inputs
    const { error } = validate.validateLogin(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    // Chech whether the entered email match the one in database
    const user = UsersModel.users.find(username => username.email === req.body.email);
    if (!user) return res.status(400).json({ status: 400, error: 'Incorrect email' });

    // Chech whether the entered password match the one in database
    const compare = bcrypt.compareSync(req.body.password, user.password);
    if (!compare) return res.status(400).json({ status: 400, error: 'Incorrect password' });

    // Generate token
    const generate = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
    };
    const token = jwt.sign(generate, 'YOU_OWN_YOUR_OWN', { expiresIn: '24h' });
    return res.header('Authorization', `${token}`).status(200).json({
      status: 200,
      message: 'Logged in successfully',
      data: {
        token,
        id: generate.id,
        firstName: generate.firstName,
        lastName: generate.lastName,
        email: generate.email,
      },
    });
  },

  getAllUsers(req, res) {
    if (!UsersModel.users.length) return res.status(404).json({ status: 404, error: 'There is no user' });
    return res.status(200).json({ status: 200, data: UsersModel.users });
  },

};
export default Users;
