const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      first_name: 'Thinkful',
      last_name: 'Student',
      email: 'thinkful@fakestudent.email.com',
      password: 'password'
    }
  ]
}

function makeItemsArray() {
	return [
		{
		id:1,
		vendor: 'Kroger',
		items: 'Dog Food',
		full_price: '$12.99',
    }
  ];
}

function makeExpectedUser(user) {
  return {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    password: email.password
  }
}

function makeAuthHeader(user, secret = 'my-own-special-jwt-secret') {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeExpectedUser,
  makeItemsArray,
  makeUsersArray,
  makeAuthHeader
}