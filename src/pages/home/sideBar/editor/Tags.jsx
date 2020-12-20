// External
import { string } from 'prop-types';

// Internal
import { Create, Delete, Update } from './tags/';

// Constants

const Tags = ({ view }) => {
  switch (view) {
    case 'create': {
      return <Create />;
    }

    case 'delete': {
      return <Delete />;
    }

    case 'update': {
      return <Update />;
    }

    default:
      return null;
  }
};

Tags.propTypes = {
  view: string.isRequired,
};

Tags.defaultProps = {};

export default Tags;
