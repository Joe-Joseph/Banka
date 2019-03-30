import express from 'express'
import signupCtrl from '../controllers/signup'

const router  = express.Router()

router.post('/auth/signup', signupCtrl.signup)

export default router