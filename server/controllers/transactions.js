import moment from 'moment'
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
        transactionId : transactions.length + 1,
        accountNumber : accountNmb,
        amount : req.body.amount,
        cashier : req.body.cashier, 
        transactionType : "debit",
        createdOn : moment().format('LL'),
        accountBalance : accountBalance
    }
    // Update account balance 
    account.openingBalance = accountBalance
    transactions.push(transaction)
    return res.status(201).json({ status: 201, data: transaction })
}

exports.creditAccount = (req, res) =>{
    const { error } = validate.validateTransaction(req.body)
    if(error) return res.status(400).json({ status: 400, error: error.details[0].message })

    let accountNmb = req.params.accountNumber
    // console.log(req.params.accountNumber)
    let account = accounts.find(acc => acc.accountNumber === parseInt(accountNmb))
    if(!account) return res.status(404).json({ status: 404, error: "Account with the given account number not found" })

    let accountBalance = account.openingBalance + req.body.amount

    const transaction = {
        transactionId : transactions.length + 1,
        accountNumber : accountNmb,
        amount : req.body.amount,
        cashier : req.body.cashier, 
        transactionType : "debit",
        accountBalance : accountBalance
    }

    account.openingBalance = accountBalance
    transactions.push(transaction)

    return res.status(200).json({ status: 200, data: transaction})

}