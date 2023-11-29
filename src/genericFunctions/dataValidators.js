import { convertToLabel } from './converters';

export function validateData(data, action) {
  let validationRules = {};
  const errors = [];

  switch (action) {
    case 'addCustomer':
      validationRules = {
        firstName: { Required: true, MaxLength: 100 },
        lastName: { Required: true, MaxLength: 100 },
        companyName: { MaxLength: 100 },
        phoneNumber: { Required: true, MaxLength: 50 },
        phoneNumber2: { MaxLength: 50 },
        email: { Required: true, MaxLength: 200, EmailAddress: true },
        email2: { MaxLength: 200, EmailAddress: true },
        extraDetails: {},
      };
      break;

    case 'editCustomer':
      validationRules = {
        firstName: { Required: true, MaxLength: 100 },
        lastName: { Required: true, MaxLength: 100 },
        companyName: { MaxLength: 100 },
      };
      break;

    case 'editcontacts':
      validationRules = {
        phoneNumber: { Required: true, MaxLength: 50 },
        phoneNumber2: { MaxLength: 50 },
        email: { Required: true, MaxLength: 200, EmailAddress: true },
        email2: { MaxLength: 200, EmailAddress: true },
        extraDetails: {},
      };
      break;

    default:
      break;
  }

  // Validate each property based on rules
  for (const prop in validationRules) {
    if (validationRules.hasOwnProperty(prop)) {
      const rules = validationRules[prop];

      // Check if property is required
      if (rules.Required && !data[prop]) {
        errors.push(`${convertToLabel(prop)} is required.`);
      }

      // Check if property exceeds maximum length
      if (
        rules.MaxLength &&
        data[prop] &&
        data[prop].length > rules.MaxLength
      ) {
        errors.push(
          `${convertToLabel(prop)} should not exceed ${
            rules.MaxLength
          } characters.`
        );
      }

      // Check if property is a valid email address
      if (rules.EmailAddress && data[prop] && !isValidEmail(data[prop])) {
        errors.push(`${convertToLabel(prop)} should be a valid email address.`);
      }
    }
  }

  return errors;
}

// Helper function to validate email addresses
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
