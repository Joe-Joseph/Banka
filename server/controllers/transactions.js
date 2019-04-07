import TransactionsModel from '../model/transaction'
import AccountsModel from '../model/account'
import validate from '../helpers/transaction-validation'

const Transactions = {
    // CREDIT ACCOUNT
    debitAccount(req, res) {
        // Validate inputs
        const { error } = validate.validateTransaction(req.body)
        if(error) return res.status(400).json({ status:400, error: error.details[0].message})

        // Find account with the given account number
        let accountNmb = req.params.accountNumber
        let account = AccountsModel.accounts.find(acc => acc.accountNumber === parseInt(accountNmb))
        //console.log(account)
        if(!account) return res.status(404).json({ status: 404, error: "Account with the given id not found"})
        
        if(account.openingBalance < req.body.amount)
        return res.status(400).json({ status: 400, error: "Insuficient balance" })
        let accountBalance = account.openingBalance - req.body.amount
        
        // Update account balance 
        account.openingBalance = accountBalance
        let transaction = TransactionsModel.debitAccount(req.body, accountNmb, accountBalance)
        return res.status(201).json({ status: 201, data: transaction })
    },

    // DEBIT ACCOUNT
    creditAccount(req, res) {
        const { error } = validate.validateTransaction(req.body)
        if(error) return res.status(400).json({ status: 400, error: error.details[0].message })

        let accountNmb = req.params.accountNumber
        let account = AccountsModel.accounts.find(acc => acc.accountNumber === parseInt(accountNmb))
        if(!account) return res.status(404).json({ status: 404, error: "Account with the given account number not found" })

        let accountBalance = account.openingBalance + req.body.amount

        account.openingBalance = accountBalance
        let transaction = TransactionsModel.creditAccount(req.body, accountNmb, accountBalance)
        return res.status(200).json({ status: 200, data: transaction})
    }
}

export default Transactions
