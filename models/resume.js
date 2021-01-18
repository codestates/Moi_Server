const mongoose = require('mongoose');
const { Schema } = mongoose;
const resumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  template: { type: String, required: true },
  form: {
    _id: false,
    info: {
      title: { type: String, default: 'Untitled' },
      contact: {
        address: { type: String },
        phone: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        link: {
          facebook: { type: String },
          twitter: { type: String },
          blog: { type: String },
          github: { type: String },
          youtube: { type: String },
          instagram: { type: String },
        },
        profile: { type: String },
      },
    },
    avatart: { type: String },
  },
  skills: [
    {
      _id: false,
      skill: { type: String },
      icon: { type: String },
    },
  ],
  workExperience: [
    {
      _id: false,
      companyName: { type: String },
      workPeriod: {
        start: { type: String },
        end: { type: String },
      },
      position: {
        name: { type: String },
        desc: [{ type: String }],
      },
    },
  ],
  education: [
    {
      _id: false,
      eduTitle: { type: String },
      eduDesc: { type: String },
      eduPeriod: {
        start: { type: String },
        end: { type: String },
      },
    },
  ],
  project: [
    {
      _id: false,
      projectName: { type: String },
      projectPeriod: { start: { type: String }, end: { type: String } },
      projectDesc: { type: String },
      projectPosition: { type: String },
    },
  ],
  AEA: [
    {
      _id: false,
      aeaTitle: { type: String },
      aeaDesc: { type: String },
      aeaPeriod: {
        start: { type: String },
        end: { type: String },
      },
    },
  ],
  certification: [
    {
      _id: false,
      certificationTitle: { type: String },
      certificationDesc: { type: String },
      certificationDate: { type: String },
    },
  ],
  createdAt: { type: Schema.Types.Date, default: Date.now() },
  updatedAt: { type: Schema.Types.Date, default: Date.now() },
});

module.exports = mongoose.model('Resume', resumeSchema);
