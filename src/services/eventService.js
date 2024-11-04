const Event = require('../modules/eventModel'); // Import the Event model

// Create a new event
const createEvent = async (eventData) => {
  const event = new Event(eventData); // Create a new event instance
  await event.save(); // Save the event to the database
  return event; // Return the created event
};

// Get a single event by ID
const getEvent = async (eventId) => {
  const event = await Event.findById(eventId).populate('attendees'); // Fetch the event by ID and populate attendees
  return event; // Return the event
};

// Get all events with optional filtering and sorting
const getEvents = async (filter = {}, sort = {}) => {
  const events = await Event.find(filter).sort(sort); // Fetch events with filter and sort options
  return events; // Return the list of events
};

// Update event information
const updateEvent = async (eventId, updateData) => {
  const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true }); // Update the event
  return updatedEvent; // Return the updated event
};

// Delete an event by ID
const deleteEvent = async (eventId) => {
  await Event.findByIdAndDelete(eventId); // Delete the event from the database
  return { message: 'Event deleted successfully' }; // Return a success message
};

// Add an attendee to an event
const addAttendee = async (eventId, userId) => {
  const event = await Event.findById(eventId); // Find the event
  if (!event) throw new Error('Event not found');
  if (!event.attendees.includes(userId)) {
    event.attendees.push(userId); // Add the user to attendees if not already present
    await event.save(); // Save the updated event
  }
  return event; // Return the updated event
};

// Remove an attendee from an event
const removeAttendee = async (eventId, userId) => {
  const event = await Event.findById(eventId); // Find the event
  if (!event) throw new Error('Event not found');
  event.attendees = event.attendees.filter(attendee => !attendee.equals(userId)); // Remove the user from attendees
  await event.save(); // Save the updated event
  return event; // Return the updated event
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
