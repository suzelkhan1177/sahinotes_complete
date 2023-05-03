const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notes_controller");

router.get("/upload_notes_page", notesController.uploadNotesPage);
router.post('/upload_notes', notesController.uploadNotes);

router.get('/show_all_notes/:profile_id',notesController.showAllNotes);
router.get('/show_single_notes/:user_id/:x',notesController.showSingleNotes);
router.get('/get_all_notes/:id',notesController.getAllNotes);


module.exports = router;
