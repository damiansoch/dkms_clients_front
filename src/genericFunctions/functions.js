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

  // Helper function to handle sorting order
  const compare = (a, b) => {
    if (a < b) return order === 'asc' ? -1 : 1;
    if (a > b) return order === 'asc' ? 1 : -1;
    return 0;
  };

  return arr.sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    // Check if the values are numbers
    if (typeof valA === 'number' && typeof valB === 'number') {
      return compare(valA, valB);
    }

    // Check if the values can be parsed as dates
    if (!isNaN(Date.parse(valA)) && !isNaN(Date.parse(valB))) {
      return compare(new Date(valA), new Date(valB));
    }

    // Otherwise, convert values to strings and compare
    return compare(String(valA), String(valB));
  });
}
