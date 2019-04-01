import express from 'express'
import signupCtrl from '../controllers/signup'
import loginCtrl from '../controllers/login'
import accountCtrl from '../controllers/account'
import transactionCtrl from '../controllers/transactions'
import auth from '../middleware/auth'

const router  = express.Router()

router.post('/auth/signup', signupCtrl.signup)
router.post('/auth/signin', loginCtrl.login)
router.post('/accounts', auth, accountCtrl.createAccount)
router.patch('/accounts/:accountNumber', auth, accountCtrl.updateAccount)
router.delete('/accounts/:accountNumber', auth, accountCtrl.deleteAccount)
router.post('/accounts/:accountNumber/debit', auth, transactionCtrl.debitAccount)
router.post('/accounts/:accountNumber/credit', auth, transactionCtrl.creditAccount)

export default router