import axios from 'axios';

export const updateAxiosFunction = async (endpoint, editedData) => {
  try {
    const response = await axios.put(endpoint, editedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const deleteAxiosFunction = async (endpoint) => {
  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const addAxiosFunction = async (endpoint, addedData) => {
  try {
    const response = await axios.post(endpoint, addedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
