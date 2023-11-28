export const isResponseSuccess = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // Success! The response status is in the 2xx range.
    return true;
  } else {
    // Handle errors or non-2xx status codes
    return false;
  }
};
