const mongoose = require('mongoose');
const { User } = require('./models/user'); 

const atlasURI = "mongodb+srv://teamwil:wilteam@cluster1.jmxik2b.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(atlasURI, { useNewUrlParser: true });

const newUser = new User({
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  email: 'john.doe@example.com',
  createPassword: 'password123',
  confirmPassword: 'password123',
  termsAndCondition: true, 
})

newUser.save()
  .then((user) => {
    console.log('User saved to the database:', user);
  })
  .catch((error) => {
    console.error('Error saving user:', error);
  });
