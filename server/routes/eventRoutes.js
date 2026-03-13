const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEventById, deleteEvent, updateEvent } = require('../controllers/eventController');


router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent); 

module.exports = router;

module.exports = router;