// This is a test file for the utility functions just run utils/test to get started on your terminal
import validateFields from './validateUserFields.js';
import {generateOTP,sendInvitationEmail } from './invite.js'
// Example usage (unchanged):
const fieldsToValidate = {
  email: 'user@example.com',
  password: 'password123',
  first_name: '',
  last_name: '',
  phone_number: 222,
};

const validationErrors = validateFields(fieldsToValidate);
const otp = generateOTP();
console.log(otp)
if (Object.keys(validationErrors).length === 0) {
  console.log('Fields are valid.');
} else {
  console.log('Validation errors:', validationErrors);
}

sendInvitationEmail('temitopeoni001@gmail.com')
sendInvitationEmail(222)