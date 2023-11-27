export const validateForm = (data, action) => {
  const errors = [];
  //checks for adding customer
  if (action === 'Adding customer') {
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

    if (
      data.email2 &&
      (data.email2.length > 200 || !isValidEmail(data.email2))
    ) {
      errors.push(
        'Email 2 must be a valid email address and at most 200 characters.'
      );
    }
  }
  if (action === 'Adding job') {
    if (!data.Name) {
      errors.push('Name is required.');
    } else if (data.Name.length > 100) {
      errors.push('Name must be at most 100 characters.');
    }

    if (!data.Description) {
      errors.push('Description is required.');
    }

    // Parse Price as a decimal
    const parsedPrice = parseFloat(data.Price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      errors.push('Price must be a positive decimal value.');
    }

    // Parse Deposit as a decimal
    const parsedDeposit = parseFloat(data.Deposit);
    if (isNaN(parsedDeposit) || parsedDeposit < 0) {
      errors.push('Deposit must be a non-negative decimal value.');
    }

    if (
      !data.ToBeCompleted ||
      !(data.ToBeCompleted instanceof Date) ||
      isNaN(data.ToBeCompleted)
    ) {
      errors.push('ToBeCompleted must be a valid date.');
    }
  }
  return errors;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
