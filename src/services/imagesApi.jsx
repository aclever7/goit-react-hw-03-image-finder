const API_KEY = '24333013-64aa15535cd3f18a71837dc06';
const BASE_URL = 'https://pixabay.com/api';

function fetchImages(nextName, limit, page) {
  const URL = `${BASE_URL}/?q=${nextName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${limit}`;

  return fetch(URL).then(r => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(
      new Error(`изображения с названием ${nextName} отсутсвуют`)
    );
  });
}

const api = { fetchImages };

export default api;
