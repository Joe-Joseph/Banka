import validate from '../helpers/account-validation'
import accounts from '../model/account'

exports.createAccount = (req, res) =>{
    const { error } = validate.validateAccount(req.body)
    if(error) return res.status(400).json({ status: 400, error: error.details[0].message })

    let account =  accounts.find(accountNmb => accountNmb.accountNumber === req.body.accountNumber)
    if(account) return res.status(400).json({ status: 400, error: "Account number already taken"})

    account = {
        id: accounts.length + 1,
        accountNumber : req.body.accountNumber,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        type : req.body.type,
        openingBalance : req.body.openingBalance
    }

    accounts.push(account)
    return res.status(201).json({ status: 201, message: "Account created successfully", data: account})
}