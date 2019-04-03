import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import users from '../model/user'
import validate from '../helpers/user-validation'

exports.login = (req, res) =>{
    // Validating user inputs
    const { error } = validate.validateLogin(req.body)
    if(error) return res.status(400).json({ status: 400, error: error.details[0].message })

    // Chech whether the entered email match the one in database
    let user = users.find(username => username.email === req.body.email)
    // console.log(user)
    if(!user) return res.status(400).json({ status: 400, error: "Incorrect email" })

    // Chech whether the entered password match the one in database
    const compare = bcrypt.compareSync(req.body.password, user.password)
    if(!compare) return res.status(400).json({ status: 400, error: "Incorrect password" })

    //Generate token
    const generate = { 
        id: user.id,
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
     }
    const token = jwt.sign(generate, 'YOU_OWN_YOUR_OWN', { expiresIn: '24h' })
    return res.header('Authorization', `${token}`).status(200).json({ status: 200, message: "Logged in successfully ", data:{ token: token, id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email}})

}
