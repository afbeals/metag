// External
import { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import RestoreIcon from '@material-ui/icons/Restore';

// Internal
import { Controls as ControlsStyled, CenterInfo } from './Controls_';
import { useMovies } from '~Modules/movies/hooks';

// Constants

const Controls = () => {
  const {
    movieSearchInfo,
    movieListArray,
    movieSearchClear,
    movieFetch,
    movieSearch,
  } = useMovies();
  const { length: totalMovies } = movieListArray;
  const { prevId = 0 } = movieSearchInfo || {};

  const calculateCurrentPage = useCallback(
    () => (prevId === 0 ? 1 : Math.ceil(prevId / 15) + 1),
    [prevId]
  );

  const calculateTotalPage = useCallback(() => Math.ceil(totalMovies / 15), [
    totalMovies,
  ]);

  const handleClear = () => {
    movieSearchClear();
    movieFetch();
  };

  const handleGetPrev = () => {
    const param = {
      ...movieSearchInfo,
      prevId: Math.min(0, prevId - 15),
    };

    movieSearch(param);
  };

  const handleGetNext = () => {
    const param = {
      ...movieSearchInfo,
      prevId: prevId + 15,
    };

    movieSearch(param);
  };

  return (
    <ControlsStyled>
      <Button
        variant='contained'
        color='secondary'
        startIcon={<NavigateBeforeIcon />}
        disabled={calculateCurrentPage() === 1}
        onClick={handleGetPrev}
      >
        Previous
      </Button>
      <CenterInfo>
        <Button
          variant='contained'
          color='secondary'
          disabled={!movieSearchInfo}
          onClick={handleClear}
          endIcon={<RestoreIcon />}
        >
          Clear
        </Button>
        <div>
          Page <span>{calculateCurrentPage()}</span> of{' '}
          <span>{calculateTotalPage()}</span>
        </div>
      </CenterInfo>

      <Button
        variant='contained'
        color='secondary'
        endIcon={<NavigateNextIcon>send</NavigateNextIcon>}
        onClick={handleGetNext}
        disabled={calculateTotalPage() === calculateCurrentPage()}
      >
        Next
      </Button>
    </ControlsStyled>
  );
};

export default Controls;
