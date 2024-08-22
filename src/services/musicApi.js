import axios from 'axios';

const API_KEY = ''
const API_URL = ''

export const generateMusic = async (mood, parameters) => {
  try {
    const response = await axios.post(API_URL, {
      mood,
      ...parameters
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    return response.data.musicUrl;
  } catch (error) {
    console.error('Error generating music', error);
    throw error;
  }
};
