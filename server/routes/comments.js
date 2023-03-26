const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comments_controller");


router.post('/new_note_comment', commentController.addNewComments);
router.delete('/delete_note_comment/:id/:fileName', commentController.deleteNewComments);
router.delete('/delete_child_note_comment/:id/:comment_id', commentController.deleteChildComments);
router.get('/get_all_comments/:id', commentController.getComments);


module.exports = router;
