import express from 'express'
import signupCtrl from '../controllers/signup'
import loginCtrl from '../controllers/login'

const router  = express.Router()

router.post('/auth/signup', signupCtrl.signup)
router.post('/auth/signin', loginCtrl.login)

export default router