const { createNewEvent,createNewUpdate,applyToEvent, getAllEvents ,getApplicants,filterEvent,deleteUpdate} = require("../controllers/eventController");
const router = require("express").Router();


  router.route('/apply/user').get(getApplicants)
  router.route('/get').get(getAllEvents);
  router.route('/filter/:eventId').get(filterEvent)
  router.route("/new").post(createNewEvent);
  router.route("/createUpdate").post(createNewUpdate);
  router.route("/apply/:id").post(applyToEvent);
  router.route('/update/delete/:updateId').delete(deleteUpdate)
  module.exports = router;