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

    case 'addaddresses':
      validationRules = {
        houseNumber: { IsNumber: true },
        houseName: { MaxLength: 100 },
        addressLine1: { MaxLength: 250 },
        addressLine2: { MaxLength: 250 },
        addressLine3: { MaxLength: 250 },
        eirCode: { IsEircode: true },
      };
      break;

    case 'addjobs':
      validationRules = {
        name: { Required: true, MaxLength: 100 },
        description: { Required: true },
        price: { Required: true, IsNumber: true },
        deposit: { Required: true, IsNumber: true },
        toBeCompleted: { Required: true, IsDate: true },
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
      // Check if property is a valid positive number
      if (rules.IsNumber && data[prop] && !isValidNumber(data[prop])) {
        errors.push(
          `${convertToLabel(prop)} should be a positive whole number.`
        );
      }
      // Check if property is a valid Eircode
      if (rules.IsEircode && data[prop] && !isValidEircode(data[prop])) {
        errors.push(`${convertToLabel(prop)} should be a valid Eircode.`);
      }
      // Check if property is a valid date
      if (rules.IsDate && data[prop] && !isValidDate(data[prop])) {
        errors.push(`${convertToLabel(prop)} should be a valid date.`);
      }
    }
  }
  console.log(errors);
  return errors;
}

// Helper function to validate email addresses
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Helper function to validate a positive integer
function isValidNumber(value) {
  const positiveWholeNumberRegex = /^[1-9]\d*$/;
  return positiveWholeNumberRegex.test(value);
}
// Helper function to validate a positive integer
function isValidEircode(value) {
  // const eircodeRegex = /^[AC-FHKNPRTV-Y][0-9W][0-9AC-FHKNPRTV-Y\s]{5}$/;
  // return eircodeRegex.test(value);
  return true;
}
// Helper function to validate date
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // simple YYYY-MM-DD check
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date.toISOString().startsWith(dateString);
}
