// External
import { string } from 'prop-types';

// Internal
import { Create, Delete, Add, Update } from './groups/';

// Constants

const Groups = ({ view }) => {
  switch (view) {
    case 'create': {
      return <Create />;
    }

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

Groups.propTypes = {
  view: string.isRequired,
};

Groups.defaultProps = {};

export default Groups;
