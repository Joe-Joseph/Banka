import express from 'express'
import signupCtrl from '../controllers/signup'
import loginCtrl from '../controllers/login'
import createAccountCtrl from '../controllers/create-account'
import auth from '../middleware/auth'

const router  = express.Router()

router.post('/auth/signup', signupCtrl.signup)
router.post('/auth/signin', loginCtrl.login)
router.post('/accounts', auth, createAccountCtrl.createAccount)

export default router