// filepath: my-web-app/my-web-app/backend/src/models/assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  graded: {
    type: Boolean,
    default: false,
  },
  examinerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

assignmentSchema.statics.findUngradedAssignments = function(examinerId) {
  return this.find({ examinerId, graded: false });
};

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;