const express = require("express");
const router = express.Router();
const { getAllusers, getUserbyID, updateUserbyId, deleteUserbyId, insertAuser } = require('../controllers/user.js')

router.get('/', getAllusers);


router.route('/:id')
    .get(getUserbyID)
    .patch(updateUserbyId)
    .delete(deleteUserbyId);



router.post('/', insertAuser);


module.exports = router;