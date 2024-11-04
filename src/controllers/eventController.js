// controllers/eventController.js
const eventService = require('../services/eventService'); // Adjust the path as necessary

// Create a new event
const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await eventService.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Get a single event by ID
const getEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventService.getEvent(eventId);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

// Get all events with optional filtering and sorting
const getEvents = async (req, res) => {
  try {
    const filter = req.query; // Optional filtering can be passed as query parameters
    const events = await eventService.getEvents(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Update event information
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body;
    const updatedEvent = await eventService.updateEvent(eventId, updateData);
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await eventService.deleteEvent(eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

// Add an attendee to an event
const addAttendee = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.body.userId; // Assume userId is sent in the request body
    const updatedEvent = await eventService.addAttendee(eventId, userId);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding attendee', error: error.message });
  }
};

// Remove an attendee from an event
const removeAttendee = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.body.userId; // Assume userId is sent in the request body
    const updatedEvent = await eventService.removeAttendee(eventId, userId);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error removing attendee', error: error.message });
  }
};

// Export all the functions for use in other modules
module.exports = {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  addAttendee,
  removeAttendee,
};
