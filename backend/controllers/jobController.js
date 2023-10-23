const Job = require("../models/job");
const Applicant = require('../models/applicant')
const cloudinary = require("cloudinary"); // Make sure to install and configure the Cloudinary library
          
cloudinary.config({ 
  cloud_name: 'projectcloudat7', 
  api_key: '844666871246736', 
  api_secret: '3hh3zsHqGjIxkRDurENWqaET848' 
});

const createNewJob = async (req, res) => {
    try {
        // Access form data from the request body
        const { jobName, jobDescription, package, company } = req.body;
        console.log(req.body)
        // Ensure that a job image file has been uploaded
        if (!req.files || !req.files.jobImage || !jobName || !jobDescription || !package || !company) {
          return res
            .status(400)
            .json({ error: "Job image is required, and some fields are missing" });
        }
    
        const jobImageFile = req.files.jobImage;

        // Upload the event image to Cloudinary
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(
          jobImageFile.tempFilePath
        );
        // Create the job document
        const newJob = new Job({
          jobName,
          jobImage: cloudinaryResponse.secure_url,
          jobDescription,
          package,
          company,
        });
    
        // Save the job document to the database
        const createdJob = await newJob.save();
    
        return res.status(200).json(createdJob);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error)
      }
    
  };

  const createJobApplication = async (req, res) => {
    try {
      // Access form data from the request body
      const { name, regNo, email, cgpa, resume } = req.body;
      const jobId=req.params.JobId
      // Create the job application document
      const newApplication = new Applicant({
        name,
        regNo,
        email,
        cgpa,
        resume,
        jobId,
      });
  
      // Save the job application document to the database
      const createdApplication = await newApplication.save();
  
      return res.status(201).json(createdApplication);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.log(error)
    }
  };

  const updateJobStatus=async(req,res)=>{
    try{
    const _id  = req.params.id;
    const status=req.body.status;
    if(!(status==="rejected" || status==="accepted")){
        return res.status(400).json({ error: "Incorrect format" });
    }
    // Check if the user ID is provided
    if (!_id) {
      return res.status(400).json({ error: "Job ID is missing" });
    }

    // Ensure that an avatar image file has been uploaded

    const updatedJob = await Applicant.findByIdAndUpdate(
      _id,
      { status:status},
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
  }

  const getAllJobs = async(req, res, next) => {
    try {
      // Use the `find` method to retrieve all events from the database
      const job = await Job.find();
  
      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  const getUserApplications = async(req,res, next) => {
    try {
        const { email } = req.query;
    
        if (!email) {
          return res.status(400).json({ error: 'Email parameter is missing' });
        }
    
        // Use the `find` method to filter applicants by email
        const filteredApplicants = await Applicant.find({ email });
    
        return res.status(200).json(filteredApplicants);
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
  }

  const filterApplicant=async(req, res) => {
    try {
      const jobId = req.params.JobId;
      const applicant = await Applicant.find({ jobId: jobId });
  
      if (applicant) {
        res.status(200).json(applicant);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving event' });
    }
  }
  const getFilteredJobs = async (req, res, next) => {
    try {
      // Get the job ID from the request parameters
      const jobId = req.params.jobId;
  
      // Use the `find` method to retrieve the job from the database based on the ID
      const job = await Job.findOne({ _id: jobId });
  
      if (!job) {
        // If the job with the given ID is not found, return a 404 Not Found response
        return res.status(404).json({ error: 'Job not found' });
      }
  
      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  module.exports = { createNewJob , createJobApplication,updateJobStatus ,getAllJobs ,filterApplicant,getUserApplications,getFilteredJobs };