import joi from 'joi'

exports.validateAccount = (account) =>{
    const accountSchema = {
        accountNumber : joi.number().min(5).required(),
        firstName : joi.string().min(3).required(),
        lastName : joi.string().min(3).required(),
        email : joi.string().email().required(),
        type : joi.string().valid('saving', 'current'),
        openingBalance : joi.number().required()
    }

    return joi.validate(account, accountSchema)
}