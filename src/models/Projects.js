const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  id: String,

  project_name: String,

  start_date: Date,

  finish_date: Date,

  client: String,

  active: Boolean,

  employees: Object,

  admin_id: Number,
});

module.exports = mongoose.model('Projects', projectsSchema);
