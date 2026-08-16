const mongoose = require('mongoose');

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be longer than 2 characters'],
    required: [true, 'Please type in a name']
  },
  number: {
    type: String,
    minLength: [8, 'Number must contain at least 8 numbers'],
    required: [true, 'Please type in a number'],
    validate: {
      validator: function(v) {
        return /^\d{2}-\d{6,}$|^\d{3}-\d{5,}$/.test(v);
      },
      message: `Number must be in format 12-345678[...] or 123-45678[...]`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)