// External
import { string } from 'prop-types';

// Internal
import { Create, Delete, Add, Update } from './categories/';

// Constants

const Categories = ({ view }) => {
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

Categories.propTypes = {
  view: string.isRequired,
};

Categories.defaultProps = {};

export default Categories;
