import axios from 'axios';

export const updateAxiosFunction = async (endpoint, editedData) => {
  try {
    const response = await axios.put(endpoint, editedData);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error updating user:', error.response);
    return error.response;
  }
};

export const deleteAxiosFunction = async (endpoint) => {
  try {
    const response = await axios.delete(endpoint);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error updating user:', error.response);
    return error.response;
  }
};

export const addAxiosFunction = async (endpoint, addedData) => {
  try {
    const response = await axios.post(endpoint, addedData);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error updating user:', error.response);
    return error.response;
  }
};
