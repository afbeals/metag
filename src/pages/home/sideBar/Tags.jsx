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
import { useTagsStore } from '~Modules/tags/hooks';
import { useMovies } from '~Modules/movies/hooks';
import { SidebarTitle } from '~Components/';
import {
  Tags as TagsStyled,
  Badge,
  List,
  ListItemIcon,
  ListItemText,
  Title,
} from './Tags_';

const Tags = () => {
  const [selected, updateSelected] = useState([]);
  const {
    tagsList,
    tagsListArray,
    tagsIsFetching,
    tagsFetch,
    tagsFetchCancel,
  } = useTagsStore();
  const {
    movieUnderTagIsFetching,
    movieUnderTag,
    movieUnderTagCancel,
    movieFetch,
    movieFetchCancel,
    movieAllIsFetching,
  } = useMovies();

  const handleRefetchTags = () => {
    if (!tagsIsFetching) {
      tagsFetch();
    }
    if (!movieAllIsFetching) {
      movieFetch();
    }
    updateSelected([]);
  };

  const handleUpdateSelected = tagId => {
    if (selected.includes(tagId)) {
      updateSelected(selected.filter(id => id !== tagId));
    } else {
      updateSelected([...selected, tagId]);
    }
  };

  useEffect(
    () => () => {
      if (tagsIsFetching && !tagsList) {
        tagsFetchCancel();
      }
    },
    []
  );

  useEffect(() => {
    if (!movieUnderTagIsFetching && selected.length > 0) {
      movieUnderTag({ tags: selected });
    } else if (!movieAllIsFetching && selected.length === 0) {
      movieFetch();
    }
    return () => {
      if (movieUnderTagIsFetching) {
        movieUnderTagCancel();
      }
      if (movieAllIsFetching) {
        movieFetchCancel();
      }
    };
  }, [selected]);

  return (
    <TagsStyled>
      <SidebarTitle title={'Current Tags:'}>
        <Title>
          <h4>Current Tags:</h4>{' '}
          <IconButton size='small' onClick={handleRefetchTags}>
            <RefreshIcon />
          </IconButton>{' '}
        </Title>
      </SidebarTitle>
      <List dense>
        {tagsListArray.map(({ id, name, amount }) => (
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
    </TagsStyled>
  );
};

export default Tags;
