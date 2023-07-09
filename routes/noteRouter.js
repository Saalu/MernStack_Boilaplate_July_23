const router = require("express").Router();
const auth = require("../middleware/auth");
const noteCtrl = require("../controller/noteCtrl");

router.route("/").get(auth, noteCtrl.getNotes).post(auth, noteCtrl.postNote);

router
  .route("/:id")
  .get(noteCtrl.getNote)
  .put(noteCtrl.updateNote)
  .delete(noteCtrl.deleteNote);

module.exports = router;
