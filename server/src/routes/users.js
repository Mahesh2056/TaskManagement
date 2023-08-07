const express = require('express')
const router = express.Router()
const {registerNewUser} = require('../controllers/users')

router.post('/register', registerNewUser)
// router.get('/users', getAllUser)
// router.get('/users/:id', getUserById)
// router.delete('/users/:id', deleteExistingUser)
// router.put('/users/:id', updateExistingUser)

module.exports = router