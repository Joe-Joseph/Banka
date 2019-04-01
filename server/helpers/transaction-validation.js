import Joi from 'joi'


exports.validateTransaction = (transaction) =>{
    const transactionSchema = {
        accountNumber : Joi.string().min(5),
        amount : Joi.number().required(),
        cashier : Joi.number().required(), 
        transactionType : Joi.string().valid('debit', 'credit'),
        accountBalance : Joi.string()

    }

    return Joi.validate(transaction, transactionSchema)
}