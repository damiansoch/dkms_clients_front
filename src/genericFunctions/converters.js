// Function to convert property names to more user-friendly labels
export const convertToLabel = (propertyName) => {
  return propertyName
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between camelCase words
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
