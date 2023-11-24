export const validateForm = (data) => {
  const errors = [];

  if (!data.firstName) {
    errors.push('First Name is required.');
  } else if (data.firstName.length > 100) {
    errors.push('First Name must be at most 100 characters.');
  }

  if (!data.lastName) {
    errors.push('Last Name is required.');
  } else if (data.lastName.length > 100) {
    errors.push('Last Name must be at most 100 characters.');
  }

  if (data.companyName && data.companyName.length > 100) {
    errors.push('Company Name must be at most 100 characters.');
  }

  if (!data.phoneNumber) {
    errors.push('Phone Number is required.');
  } else if (data.phoneNumber.length > 50) {
    errors.push('Phone Number must be at most 50 characters.');
  }

  if (data.phoneNumber2 && data.phoneNumber2.length > 50) {
    errors.push('Phone Number 2 must be at most 50 characters.');
  }

  if (!data.email) {
    errors.push('Email is required.');
  } else if (data.email.length > 200 || !isValidEmail(data.email)) {
    errors.push(
      'Email must be a valid email address and at most 200 characters.'
    );
  }

  if (data.email2 && (data.email2.length > 200 || !isValidEmail(data.email2))) {
    errors.push(
      'Email 2 must be a valid email address and at most 200 characters.'
    );
  }

  return errors;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
