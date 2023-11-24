import axios from 'axios';

export const updateAxiosFunction = async (endpoint, editedData) => {
  try {
    const response = await axios.put(endpoint, editedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
