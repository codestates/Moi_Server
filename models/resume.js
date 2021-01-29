const mongoose = require('mongoose');
const { Schema } = mongoose;
const resumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  template: { type: Number },
  info: {
    title: { type: String, default: 'Untitled' },
    username: { type: String },
    profile: { type: String },
    avatar: { type: String },
    contact: {
      address: { type: String },
      phone: { type: String },
      email: { type: String },
      link: {
        facebook: { type: String },
        twitter: { type: String },
        blog: { type: String },
        github: { type: String },
        youtube: { type: String },
        instagram: { type: String },
      },
    },
  },
  skills: [
    {
      _id: false,
      skill: { type: String },
      desc: { type: String },
    },
  ],
  workExperience: [
    {
      _id: false,
      companyName: { type: String },
      start: { type: String },
      end: { type: String },
      positionName: { type: String },
      desc: [{ description: { type: String } }],
    },
  ],
  educations: [
    {
      _id: false,
      eduTitle: { type: String },
      eduDesc: { type: String },
      start: { type: String },
      end: { type: String },
    },
  ],
  project: [
    {
      _id: false,
      projectName: { type: String },
      start: { type: String },
      end: { type: String },
      projectDesc: { type: String },
      projectPosition: { type: String },
    },
  ],
  aeas: [
    {
      _id: false,
      aeaTitle: { type: String },
      aeaDesc: { type: String },
      aeaDate: { type: String },
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
  createdAt: { type: String },
  updatedAt: { type: String },
});

resumeSchema.method('dateFormatting', (now) => {
  const currentTimeZoneOffsetInHours = -now.getTimezoneOffset() / 60;
  const currentTimeZone = new Date(now + currentTimeZoneOffsetInHours);
  const year = currentTimeZone.getFullYear();
  const month = `0${currentTimeZone.getMonth() + 1}`.slice(-2);
  const date = `0${currentTimeZone.getDate()}`.slice(-2);
  const hours = `0${currentTimeZone.getHours()}`.slice(-2);
  const minutes = `0${currentTimeZone.getMinutes()}`.slice(-2);
  const seconds = `0${currentTimeZone.getSeconds()}`.slice(-2);

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
});

module.exports = mongoose.model('Resume', resumeSchema);
