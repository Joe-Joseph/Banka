import transactions from '../model/transaction'
import accounts from '../model/account'
import validate from '../helpers/transaction-validation'

exports.debitAccount = (req, res) =>{
    // Validate inputs
    const { error } = validate.validateTransaction(req.body)
    if(error) return res.status(400).json({ status:400, error: error.details[0].message})

    // Find account with the given account number
    let accountNmb = req.params.accountNumber
    let account = accounts.find(acc => acc.accountNumber === parseInt(accountNmb))
    //console.log(account)
    if(!account) return res.status(404).json({ status: 404, error: "Account with the given id not found"})
    
    if(account.openingBalance < req.body.amount)
    return res.status(400).json({ status: 400, error: "Insuficient balance" })
    let accountBalance = account.openingBalance - req.body.amount
    
    const transaction = {
        accountNumber : accountNmb,
        amount : req.body.amount,
        cashier : req.body.cashier, 
        transactionType : "debit",
        accountBalance : accountBalance
    }
    // Update account balance 
    account.openingBalance = accountBalance
    accounts.push(account)
    transactions.push(transaction)
    return res.status(201).json({ status: 201, data: transaction })
}