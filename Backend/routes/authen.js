var express = require('express');
const { register, login } = require('../controllers/authentication/authentication');
var router = express.Router();

/* POST. */
router.post('/register', register);

router.post('/login', login )

module.exports = router;