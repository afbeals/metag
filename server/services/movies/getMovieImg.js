// External
import path from 'path';

// Internal

// Constants
const { SERVER_AD_THUMB: adThumb } = process.env;

// get movie image
const getMovieImg = ({ query: { type = 'jpg', movie_id } }) => {
  if (!movie_id) {
    return Promise.reject({ message: 'missing movie id parameter' });
  }
  const img = type === 'jpg' ? 'thumb.jpg' : 'gif.gif';
  return Promise.resolve(path.join(adThumb, `${movie_id}`, `${img}`));
};

export default getMovieImg;
