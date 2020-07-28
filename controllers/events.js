//const response es solo para ayuda al escribir
const { response } = require('express');

// User es el modelo que uso como base para generar los usuarios en la db
const Event = require('../models/EventModel');

const eventController = {
  getEvent: async (req, res) => {
    const events = await Event.find().populate('user', 'name');

    res.json({
      ok: true,
      events,
    });
  },

  createEvent: async (req, res) => {
    const event = new Event(req.body);

    try {
      event.user = req.uid;
      await event.save();
      res.json({
        ok: true,
        event,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Database error',
      });
    }
  },

  updateEvent: async (req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({
          ok: false,
          msg: `There is no event assigned to this id ${eventId}`,
        });
      }

      if (event.user.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          msg: `This user is not authorized to make changes`,
        });
      }

      const newEvent = {
        ...req.body,
        user: uid,
      };

      const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
        new: true,
      });

      res.json({
        ok: true,
        updatedEvent,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Database error',
      });
    }
  },

  deleteEvent: async (req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({
          ok: false,
          msg: 'There is no event with this id',
        });
      }

      if (event.user.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          msg: 'This user in not authorized to make changes',
        });
      }

      await Event.findByIdAndDelete(eventId);

      res.json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Database error',
      });
    }
  },
};

module.exports = eventController;
