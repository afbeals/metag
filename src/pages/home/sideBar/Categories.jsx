// External
import { useEffect, useState, Fragment } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import MovieIcon from '@material-ui/icons/Movie';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

// Internal
import { useCategoriesStore } from '~Modules/categories/hooks';
import { useMovies } from '~Modules/movies/hooks';
import { SidebarTitle, Loading } from '~Components/';
import {
  Categories as CategoriesStyled,
  Badge,
  List,
  ListItemIcon,
  ListItemText,
  Title,
} from './Categories_';

const Categories = () => {
  const [selected, updateSelected] = useState([]);
  const {
    catList,
    catListArray,
    catAllIsFetching,
    catFetch,
    catFetchCancel,
  } = useCategoriesStore();
  const {
    movieUnderCatIsFetching,
    movieUnderCat,
    movieUnderCatCancel,
    movieFetch,
    movieFetchCancel,
    movieAllIsFetching,
  } = useMovies();

  const handleRefetchGroups = () => {
    if (!catAllIsFetching) {
      catFetch();
    }
    if (!movieAllIsFetching) {
      movieFetch();
    }
    updateSelected([]);
  };

  const handleUpdateSelected = catId => {
    if (selected.includes(catId)) {
      updateSelected(selected.filter(id => id !== catId));
    } else {
      updateSelected([...selected, catId]);
    }
  };

  useEffect(
    () => () => {
      if (catAllIsFetching && !catList) {
        catFetchCancel();
      }
    },
    []
  );

  useEffect(() => {
    if (!movieUnderCatIsFetching && selected.length > 0) {
      movieUnderCat({ categories: selected });
    } else if (!movieAllIsFetching && selected.length === 0) {
      movieFetch();
    }

    return () => {
      if (movieUnderCatIsFetching) {
        movieUnderCatCancel();
      }
      if (movieAllIsFetching) {
        movieFetchCancel();
      }
    };
  }, [selected]);

  return (
    <CategoriesStyled>
      {catAllIsFetching && <Loading />}
      <SidebarTitle title={'Current Groups:'}>
        <Title>
          <h4>Current Groups:</h4>{' '}
          <IconButton size='small' onClick={handleRefetchGroups}>
            <RefreshIcon />
          </IconButton>{' '}
        </Title>
      </SidebarTitle>
      <List dense>
        {catListArray.map(({ id, name, amount }) => (
          <Fragment key={id}>
            <ListItem
              onClick={() => handleUpdateSelected(id)}
              button
              selected={selected.indexOf(id) > -1}
            >
              <ListItemIcon>
                <Badge badgeContent={amount} color='secondary'>
                  <MovieIcon fontSize='small' />
                </Badge>
              </ListItemIcon>
              <ListItemText id={`${name}-${id}`} primary={name} />

              <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  checked={selected.indexOf(id) > -1}
                  inputProps={{ 'aria-labelledby': `${name}-${id}` }}
                  onClick={() => handleUpdateSelected(id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant='middle' />
          </Fragment>
        ))}
      </List>
    </CategoriesStyled>
  );
};

export default Categories;
