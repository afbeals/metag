// External
import { useEffect, useState } from 'react';

// Internal
import { Player, Reel } from './viewer/';
import { Viewer as ViewerStyled } from './Viewer_';
import { Loading } from '~Components/';
import { useMovies } from '~Modules/movies/hooks';

// Constants
const classname = 'viewer';

const Viewer = () => {
  const [isFetching, updateIsFetching] = useState(false);
  const {
    movieAllIsFetching,
    movieUnderCatIsFetching,
    movieUnderGroupIsFetching,
    movieUnderTagIsFetching,
    movieSearchIsFetching,
  } = useMovies();

  useEffect(() => {
    updateIsFetching(
      movieAllIsFetching ||
        movieUnderCatIsFetching ||
        movieUnderGroupIsFetching ||
        movieUnderTagIsFetching ||
        movieSearchIsFetching
    );
  }, [
    movieAllIsFetching,
    movieUnderCatIsFetching,
    movieUnderGroupIsFetching,
    movieUnderTagIsFetching,
    movieSearchIsFetching,
  ]);

  return (
    <ViewerStyled className={classname}>
      {isFetching && <Loading />}
      <Player />
      <Reel />
    </ViewerStyled>
  );
};

Viewer.propTypes = {};

Viewer.defaultProps = {};

export default Viewer;
