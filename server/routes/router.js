import express from 'express'
import signupCtrl from '../controllers/signup'
import loginCtrl from '../controllers/login'
import accountCtrl from '../controllers/account'
import auth from '../middleware/auth'

const router  = express.Router()

router.post('/auth/signup', signupCtrl.signup)
router.post('/auth/signin', loginCtrl.login)
router.post('/accounts', auth, accountCtrl.createAccount)
router.patch('/accounts/:id', auth, accountCtrl.updateAccount)

export default router