// External
import { useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

// Internal
import { Container, List, ListItem } from './Categories_';
import { useCategoriesStore } from '~Modules/categories/hooks';
import movieActions from '~Modules/movies/actions';

// Constants
const classname = '_categories';

const Categories = ({ parentclass }) => {
  const baseClass = `${parentclass}${classname}`;
  const dispatch = useDispatch();
  const [editorOpen, updateEditorOpen] = useState(null);
  const [editorValues, updateEditorVals] = useState({});
  const [selectedCat, updateSelected] = useState('');
  const {
    movies: {
      under_cat: {
        request,
        cancel,
        _meta: { isFetching: movieIsFetching },
      },
    },
  } = movieActions;

  const handleUpdateEditorOpen = (pref = null) => {
    updateEditorOpen(pref);
  };

  const {
    catList,
    catListArray,
    catAllIsFetching,
    catFetch,
    catFetchCancel,
  } = useCategoriesStore();

  const handleUpdateEditorVals = (v = {}) => {
    const newVals = {
      ...editorValues,
      ...v,
    };
    updateEditorVals(newVals);
  };

  const handleFetchCategories = id => {
    if (movieIsFetching) {
      dispatch(cancel());
    }
    if (id) {
      dispatch(request({ categories: [id], limit: 1000 }));
    }
  };

  useEffect(() => {
    if (!catList && !catAllIsFetching) {
      catFetch();
    }
    return () => {
      if (catAllIsFetching) {
        catFetchCancel();
      }
    };
  }, [catList, catAllIsFetching, catFetch, catFetchCancel]);

  return (
    <Container className={baseClass}>
      <List>
        {catListArray.map(({ name, id }) => (
          <ListItem selected={selectedCat === name} key={`${name}`}>
            {editorOpen === id && (
              <TextField
                onChange={e =>
                  handleUpdateEditorVals({ category: e.target.value })
                }
                id='outlined-search'
                label='Category'
                type='search'
                variant='outlined'
                size='small'
                value={editorValues.category}
              />
            )}
            {editorOpen !== id && (
              <div
                role='button'
                tabIndex={0}
                onKeyDown={() => {
                  if (selectedCat === name) {
                    updateSelected('');
                  } else {
                    updateSelected(name);
                    handleFetchCategories(id);
                  }
                }}
                onClick={() => {
                  if (selectedCat === name) {
                    updateSelected('');
                  } else {
                    updateSelected(name);
                    handleFetchCategories(id);
                  }
                }}
              >
                {name}
              </div>
            )}
            <EditIcon
              onClick={() => {
                if (id !== editorOpen) {
                  handleUpdateEditorOpen(id);
                  handleUpdateEditorVals({ category: name });
                } else {
                  handleUpdateEditorOpen(null);
                }
              }}
              fontSize={'small'}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

Categories.propTypes = {
  parentclass: string,
};

Categories.defaultProps = {
  parentclass: '',
};

export default Categories;
