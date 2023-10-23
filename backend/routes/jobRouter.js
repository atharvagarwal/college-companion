const { createNewJob , createJobApplication , updateJobStatus, getAllJobs,getUserApplications,filterApplicant,getFilteredJobs } = require("../controllers/jobController");
const router = require("express").Router();
  
  router.route('/get').get(getAllJobs);
  router.route('/get/:jobId').get(getFilteredJobs);
  router.route("/new").post(createNewJob);
  router.route('/application/user').get(getUserApplications);
  router.route('/application/:JobId').post(createJobApplication);
  router.route('/application/update/:id').post(updateJobStatus);
  router.route('/application/:JobId').get(filterApplicant)
  module.exports = router;