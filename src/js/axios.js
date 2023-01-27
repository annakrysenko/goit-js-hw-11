import axios from 'axios';

const API_KEY = '33150611-24a765514bc0673e581c5440a';
const URL = 'https://pixabay.com/api/';


export async function getAxiosImages(query, page, per_page) {
  try {
    const response = await axios.get(
        `${URL}?&key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
    );
    const data = response.data;
    return data;
  }
  
  catch (error) {
    console.error(error);
  }
}