// External
import { useEffect } from 'react';

// Internal
import { useMovies } from '~Modules/movies/hooks';
import { Card } from './reel/';
import { Reel as ReelStyled } from './Reel_';
import ErrorBoundary from '~Components/ErrorBoundary';
// Constants
const classname = 'reel';

const Reel = () => {
  const {
    movieList,
    movieListArray,
    movieFetch,
    movieAllIsFetching,
    movieSelectedId,
    movieSelect,
  } = useMovies();

  useEffect(() => {
    if (!movieAllIsFetching && !movieList) {
      movieFetch();
    }
  }, [movieList, movieFetch, movieAllIsFetching]);

  return (
    <ErrorBoundary>
      <ReelStyled movieSelected={!!movieSelectedId} className={classname}>
        {movieListArray.length < 1 && <div>No movies</div>}
        {movieListArray.map(({ id, img_src: imgSrc, ...rest }) => (
          <Card
            key={`${id}`}
            id={id}
            selectedId={movieSelectedId}
            selectMovie={movieSelect}
            img={imgSrc}
            {...rest}
          />
        ))}
        <div>controls</div>
      </ReelStyled>
    </ErrorBoundary>
  );
};

Reel.propTypes = {};

Reel.defaultProps = {};

export default Reel;
