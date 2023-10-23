const Event = require("../models/event");
const Update = require("../models/update");
const cloudinary = require("cloudinary"); // Make sure to install and configure the Cloudinary library

cloudinary.config({
  cloud_name: "projectcloudat7",
  api_key: "844666871246736",
  api_secret: "3hh3zsHqGjIxkRDurENWqaET848",
});

const createNewEvent = async (req, res) => {
  try {
    // Access form data from the request body
    const { eventName } = req.body;

    // Ensure that an event image file has been uploaded
    if (!req.files || !req.files.eventImage || !eventName) {
      return res
        .status(500)
        .json({ error: "Event image is required or eventName is missing" });
    }

    const eventImageFile = req.files.eventImage;

    // Upload the event image to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      eventImageFile.tempFilePath
    );

    // Create the event document
    const newEvent = new Event({
      eventName,
      eventImage: cloudinaryResponse.secure_url,
    });

    // Save the event document to the database
    const createdEvent = await newEvent.save();

    return res.status(200).json(createdEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

const createNewUpdate = async (req, res) => {
  try {
    // Access form data from the request body
    const { updateTitle, updateDescription } = req.body;

    // Ensure that an event image file has been uploaded
    if (!updateTitle || !updateDescription) {
      return res.status(500).json({ error: "Some fields are missing" });
    }

    // Create the event document
    const newUpdate = new Update({
      updateTitle,
      updateDescription,
    });

    // Save the event document to the database
    const createdUpdate = await newUpdate.save();

    return res.status(200).json(createdUpdate);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

// Controller to apply to an event with a specific ID
const applyToEvent = async (req, res) => {
  try {
    const {name, regNo, _id } = req.body;
    const eventId = req.params.id; // Assuming you pass the event ID in the URL parameters

    // Check if the event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Create an application object
    const application = {
      name: name,
      regNo: regNo,
      _id: _id, // Generate a new ObjectId for the application
    };

    // Add the application to the event's "applied" array
    event.applied.push(application);

    // Save the updated event
    await event.save();

    return res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEvents = async(req, res, next) => {
  try {
    // Use the `find` method to retrieve all events from the database
    const events = await Event.find();

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const getApplicants = async (req, res, next) => {
  try {
    const { regNo } = req.query;

    if (!regNo) {
      return res.status(400).json({ error: 'regNo parameter is missing' });
    }

    // Use Mongoose to find events where the applicant's regNo matches
    const events = await Event.find({ 'applied.regNo': regNo });

    if (events.length === 0) {
      return res.status(404).json({ error: 'No events found for the specified regNo' });
    }

    // Extract the list of events
    const eventList = events.map((event) => ({
      eventId: event._id,
      eventName: event.eventName,
      eventImage: event.eventImage,
    }));

    return res.status(200).json(eventList);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const filterEvent=async(req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.find({ _id: eventId });

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving event' });
  }
}
const deleteUpdate=async(req, res) => {
  try {
    const updateId = req.params.updateId;
    const deletedUpdate = await Update.findByIdAndDelete(updateId);

    if (deletedUpdate) {
      res.status(200).json({ message: 'Update deleted successfully' });
    } else {
      res.status(404).json({ message: 'Update not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting update' });
  }
}

module.exports = { createNewEvent, createNewUpdate , applyToEvent ,getAllEvents , getApplicants,filterEvent,deleteUpdate};
