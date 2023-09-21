const validateFields= (fields) =>{
  const errors = {};

  // Validate email
  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(fields.email)) {
    errors.email = 'Invalid email format';
  }

  // Validate password
  if (!fields.password || !fields.password.trim()) {
    errors.password = 'Password is required';
  } else if (fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  // Validate first name (required)
  if (!fields.first_name || !fields.first_name.trim()) {
    errors.first_name = 'First name is required';
  }

  // Validate last name (required)
  if (!fields.last_name || !fields.last_name.trim()) {
    errors.last_name = 'Last name is required';
  }
  // Validate phone number (optional)
  if (!fields.phone_number ) {
    errors.phone_number = 'No phone number was provided';
  }
//   else if(typeof fields.phone_number !== 'number'){
//     errors.phone_number = 'Invalid phone number format';
//   }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

export default validateFields;



