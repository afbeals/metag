// External
import { useEffect, useState, Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import MovieIcon from '@material-ui/icons/Movie';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

// Internal
import { useGroupsHook } from '~Modules/groups/hooks';
import { useMovies } from '~Modules/movies/hooks';
import { SidebarTitle, Loading } from '~Components/';
import {
  Groups as GroupsStyled,
  Badge,
  ListItemIcon,
  ListItemText,
  Title,
} from './Groups_';

const Groups = () => {
  const [selected, updateSelected] = useState([]);
  const {
    groupList,
    groupListArray,
    groupAllIsFetching,
    groupFetch,
    groupFetchCancel,
  } = useGroupsHook();
  const {
    movieUnderGroupIsFetching,
    movieUnderGroup,
    movieUnderGroupCancel,
    movieFetch,
    movieFetchCancel,
    movieAllIsFetching,
  } = useMovies();

  const handleRefetchGroups = () => {
    if (!groupAllIsFetching) {
      groupFetch();
    }
    if (!movieAllIsFetching) {
      movieFetch();
    }
    updateSelected([]);
  };

  const handleUpdateSelected = groupId => {
    if (selected.includes(groupId)) {
      updateSelected(selected.filter(id => id !== groupId));
    } else {
      updateSelected([...selected, groupId]);
    }
  };

  useEffect(
    () => () => {
      if (groupAllIsFetching && !groupList) {
        groupFetchCancel();
      }
    },
    []
  );

  useEffect(() => {
    if (!movieUnderGroupIsFetching && selected.length > 0) {
      movieUnderGroup({ groups: selected });
    } else if (!movieAllIsFetching && selected.length === 0) {
      movieFetch();
    }

    return () => {
      if (movieUnderGroupIsFetching) {
        movieUnderGroupCancel();
      }
      if (movieAllIsFetching) {
        movieFetchCancel();
      }
    };
  }, [selected]);

  return (
    <GroupsStyled>
      {groupAllIsFetching && <Loading />}
      <SidebarTitle title={'Current Groups:'}>
        <Title>
          <h4>Current Groups:</h4>{' '}
          <IconButton size='small' onClick={handleRefetchGroups}>
            <RefreshIcon />
          </IconButton>{' '}
        </Title>
      </SidebarTitle>
      <List dense>
        {groupListArray.map(({ id, name, amount }) => (
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
    </GroupsStyled>
  );
};

export default Groups;
