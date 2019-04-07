import Joi from 'joi'


exports.validateTransaction = (transaction) =>{
    const transactionSchema = {
        amount : Joi.number().required(),
        cashier : Joi.number().required()
    }

    return Joi.validate(transaction, transactionSchema)
}