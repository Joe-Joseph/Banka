import validate from '../helpers/account-validation'
import accounts from '../model/account'

//  CREATE ACCOUNT
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

// UPDATE ACCOUNT
exports.updateAccount = (req, res) =>{
    // Find account with a given id
    let account = accounts.find(acc => acc.id === parseInt(req.params.id))
    if(!account) return res.status(404).json({ status:404, error: "Account with the given id is not found"})

    const { error } = validate.validateAccount(req.body)
    if(error) return res.status(400).json({ status: 400, error: error.dtails[0].message })

    account.accountNumber = req.body.accountNumber
    return res.status(200).json({ status: 200, message: "Updated successfully", data: account })
}

// DELETE ACCOUNT
exports.deleteAccount = (req, res) =>{
    // Find account with a given ID
    let account = accounts.fill(acc => acc.id === parseInt(req.params.id))
    if(!account) return res.status(404).json({ status: 404, error: "Account with the given ID is not found" })

    const index = accounts.indexOf(account)
    accounts.splice(index)

    return res.status(200).json({ status: 200, message: "Account successfulluy deleted"})
}