// External

// Internal
import { useMovies } from '~Modules/movies/hooks';
import { Player as PlayerStyled, VideoWrapper, CloseButton } from './Player_';

// Constants
import constants from '~GlobalUtil/constants';
const classname = 'player';
const {
  API: {
    ROOT,
    MOVIES: {
      STREAM,
      GET: { IMG },
    },
  },
} = constants;

const Player = () => {
  const { movieSelected, movieSelect } = useMovies();

  return (
    <PlayerStyled hasMovie={!!movieSelected} className={classname}>
      {movieSelected && (
        <CloseButton
          onClick={() => movieSelect(null)}
          variant='contained'
          color='Secondary'
        >
          Close
        </CloseButton>
      )}
      {movieSelected && (
        <VideoWrapper>
          <video
            controls
            autoPlay
            width='100%'
            poster={`${ROOT}${IMG}?movie_id=${movieSelected.id}`}
            src={`${ROOT}${STREAM}?id=${movieSelected.id}`}
            type='video/mp4'
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
        </VideoWrapper>
      )}
    </PlayerStyled>
  );
};

Player.propTypes = {};

Player.defaultProps = {};

export default Player;
