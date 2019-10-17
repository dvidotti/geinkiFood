const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
  email: String,
  phone: String,
},
{
  timestamps: true,
})

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;