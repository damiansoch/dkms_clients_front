export const sortByKey = (data, key, sortOrder) => {
  return [...data].sort((a, b) => {
    const valueA = a[key] || ''; // Default to an empty string if the value is null or undefined
    const valueB = b[key] || '';
    const comparison = valueA.localeCompare(valueB);
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const searchByFunction = (arr, key, searchText) => {
  let filtered = [];
  if (Array.isArray(arr)) {
    filtered = arr.filter(
      (customer) =>
        customer[key] !== null &&
        customer[key].toLowerCase().includes(searchText.toLowerCase())
    );
  }
  return filtered;
};
export const checkIfDate = (data) => {
  const isDateTimeString =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,2})?$/.test(data);
  return isDateTimeString;
};
