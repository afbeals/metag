// External
import { string } from 'prop-types';

// Internal
import { Add, Delete, Update } from './movies/';

// Constants

const Movies = ({ view }) => {
  switch (view) {
    case 'delete': {
      return <Delete />;
    }

    case 'add': {
      return <Add />;
    }

    case 'update': {
      return <Update />;
    }

    default:
      return null;
  }
};

Movies.propTypes = {
  view: string.isRequired,
};

Movies.defaultProps = {};

export default Movies;
