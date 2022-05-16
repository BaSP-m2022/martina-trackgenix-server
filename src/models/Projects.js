const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  project_name: {
    type: String,
    requires: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  finish_date: {
    type: Date,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  employees: {
    type: [Object],
    required: true,
  },
  admin_id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Projects', projectsSchema);
