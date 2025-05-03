const router = require('express').Router();
const{
    getUser,
    updateUser,
    changePassword
} = require('../controller/user.controller');
const {protect} = require('../middleware/auth.token');

router.use(protect);
router.get('/', getUser);
router.put('/', updateUser);
router.put('/change/password', changePassword);

module.exports = router;
