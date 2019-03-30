import _ from 'lodash'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validate from '../helpers/user-validation'
import users from '../model/user'

exports.signup = (req, res) =>{
    // Validate user inputs
    const { error } = validate.validateUser(req.body)
    if(error) return res.status(400).json({ status: 400, error: error.details[0].message })

    // Check whether the entered email does not exist
    let user = users.find(username => username.email === req.body.email)
    if(user) return res.status(400).json({ status: 400, error: "Email already registered" })

    user = {
        id: users.length + 1,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password) 
    }

    users.push(user)
    // console.log(user.id)
    const userId = {id: user.id}
    const token = jwt.sign(userId, 'YOU_OWN_YOUR_OWN', {expiresIn : '24h'})
    // console.log(token)
    return res.status(201).json({ status: 201, token: token, data: _.pick(user, ['id', 'firstName', 'lastName', 'email']) })
}
