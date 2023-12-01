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

export function sortArrayByObjectKey(arr, key, order) {
  console.log(order);
  if (!arr || !Array.isArray(arr) || arr.length === 0 || !key) {
    return [];
  }

  // Define the compare function for ascending order
  const compareAsc = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  // Define the compare function for descending order
  const compareDesc = (a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  };

  // Choose the appropriate comparison function based on order
  const compareFunction = order === 'asc' ? compareAsc : compareDesc;

  return [...arr].sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    // Check if the values are numbers
    if (typeof valA === 'number' && typeof valB === 'number') {
      return compareFunction(valA, valB);
    }

    // Check if the values can be parsed as dates
    if (!isNaN(Date.parse(valA)) && !isNaN(Date.parse(valB))) {
      return compareFunction(new Date(valA), new Date(valB));
    }

    // Otherwise, convert values to strings and compare
    return compareFunction(
      String(valA).toLowerCase(),
      String(valB).toLowerCase()
    );
  });
}
