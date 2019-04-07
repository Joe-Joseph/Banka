import express from 'express'
import Users from '../controllers/signup'
import Accounts from '../controllers/account'
import Transactions from '../controllers/transactions'
import auth from '../middleware/auth'

const router  = express.Router()

router.post('/auth/signup', Users.signup)
router.post('/auth/signin', Users.login)
router.post('/accounts', auth, Accounts.createAccount)
router.get('/accounts', auth, Accounts.getAllAccounts)
router.patch('/accounts/:accountNumber', auth, Accounts.updateAccount)
router.delete('/accounts/:accountNumber', auth, Accounts.deleteAccount)
router.post('/accounts/:accountNumber/debit', auth, Transactions.debitAccount)
router.post('/accounts/:accountNumber/credit', auth, Transactions.creditAccount)

export default router