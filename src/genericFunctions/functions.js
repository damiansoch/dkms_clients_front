export const isResponseSuccess = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // Success! The response status is in the 2xx range.
    return true;
  } else {
    // Handle errors or non-2xx status codes
    return false;
  }
};

export function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export function sortArrayByObjectKey(arr, key, order = 'asc') {
  if (!arr || !Array.isArray(arr) || arr.length === 0 || !key) {
    return [];
  }

  // Function to check if a value is null, undefined, or an empty string
  const isNullOrUndefinedOrEmpty = (value) => {
    return value === null || value === undefined || value === '';
  };

  // Define the compare function
  const compareFunction = (a, b) => {
    let valA = a[key];
    let valB = b[key];

    // Check for null, undefined or empty values
    if (isNullOrUndefinedOrEmpty(valA) && isNullOrUndefinedOrEmpty(valB)) {
      return 0;
    }
    if (isNullOrUndefinedOrEmpty(valA)) {
      return order === 'asc' ? 1 : -1;
    }
    if (isNullOrUndefinedOrEmpty(valB)) {
      return order === 'asc' ? -1 : 1;
    }

    // Treat as a number if it's strictly a number
    if (
      !isNaN(valA) &&
      !isNaN(parseFloat(valA)) &&
      !isNaN(valB) &&
      !isNaN(parseFloat(valB))
    ) {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      // Treat as a string
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }

    // Compare values
    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  };

  return [...arr].sort(compareFunction);
}
