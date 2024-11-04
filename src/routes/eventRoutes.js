// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController'); // Adjust the path as necessary

// POST: Create a new event
router.post('/', eventController.createEvent);

// GET: Retrieve a single event by ID
router.get('/:id', eventController.getEvent);

// GET: Retrieve all events with optional filtering and sorting
router.get('/', eventController.getEvents); // Optional filtering can be passed as query parameters

// PUT: Update an existing event
router.put('/:id', eventController.updateEvent);

// DELETE: Remove an event by ID
router.delete('/:id', eventController.deleteEvent);

// POST: Add an attendee to an event
router.post('/:id/attendees', eventController.addAttendee);

// DELETE: Remove an attendee from an event
router.delete('/:id/attendees', eventController.removeAttendee);

module.exports = router;
