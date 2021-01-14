const mongoose = require('mongoose');

const { Schema } = mongoose;
const resumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  form: {
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
      skill: { type: String },
      icon: { type: String },
    },
  ],
  workExperience: {
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
  education: [
    {
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
      projectName: { type: String },
      projectPeriod: { start: { type: String }, end: { type: String } },
      projectDesc: { type: String },
      projectPosition: { type: String },
    },
  ],
  AEA: [
    {
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
      certificationTitle: { type: String },
      certificationDesc: { type: String },
      certificationDate: { type: String },
    },
  ],
});

module.exports = mongoose.model('Resume', resumeSchema);
