import jwt from 'jsonwebtoken'
import validate from '../helpers/account-validation'
import AccountsModel from '../model/account'

const Accounts = {
//  CREATE ACCOUNT
  createAccount(req, res) {
    const { error } = validate.validateAccount(req.body)
    if(error) return res.status(400).json({ status: 400, error: error.details[0].message })
    
    let account = AccountsModel.createAccount(req.body, req.user)
    let token = jwt.sign(req.user, 'YOU_OWN_YOUR_OWN')
    return res.header('Authorization', `${token}`).status(201).json({ status: 201, message: "Account created successfully", data: account})
  },

// UPDATE ACCOUNT
updateAccount(req, res) {
    // Find account with a given account number
    let account = AccountsModel.accounts.find(acc => acc.accountNumber === parseInt(req.params.accountNumber))
    if(!account) return res.status(404).json({ status:404, error: "Account with the given account number is not found"})

    const { error } = validate.validateUpdate(req.body)
    if(error) return res.status(400).json({ status: 400, error: error.details[0].message })

    account.status = req.body.status
    return res.status(200).json({ status: 200, message: "Updated successfully", data: account })
  },

  // DELETE ACCOUNT
deleteAccount (req, res) {
    // Find account with a given account number
    let account = AccountsModel.accounts.find(acc => acc.accountNumber === parseInt(req.params.accountNumber))
    //console.log(account)
    if(!account) return res.status(404).json({ status: 404, error: "Account with the given account number is not found" })
    
    const index = AccountsModel.accounts.indexOf(account)
    AccountsModel.accounts.splice(index, 1)

    return res.status(200).json({ status: 200, message: "Account successfulluy deleted"})
},

getAllAccounts(req, res) {
  if(!AccountsModel.accounts.length) return res.status(404).json({ status:404, message: "There is no account" })
  res.status(200).json({ status: 200, data: AccountsModel.accounts })
}

}

export default Accounts
