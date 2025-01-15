import axios from 'axios';

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
};
