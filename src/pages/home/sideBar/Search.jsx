// External
import { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Internal
import { SidebarTitle, Loading } from '~Components/';
import { useGroupsHook } from '~Modules/groups/hooks';
import { useCategoriesStore } from '~Modules/categories/hooks';
import { useTagsStore } from '~Modules/tags/hooks';
import { useMovies } from '~Modules/movies/hooks';
import {
  Input,
  CheckList,
  CheckListTitle,
  CheckboxLabel,
  Title,
  Search as SearchStyled,
  Submit,
  Button,
  UserInputs,
} from './Search_';

// Constants

const Search = () => {
  const [searchValues, updateSearchValues] = useState({
    name: '',
    tags: [],
    categories: [],
    groups: [],
  });

  const { name, tags, categories, groups } = searchValues;

  const handleUpdateEditor = (key, val) => {
    let updated = {};
    if (Array.isArray(searchValues[key])) {
      if (searchValues[key].includes(val)) {
        updated = { [key]: searchValues[key].filter(id => id !== val) };
      } else {
        updated = { [key]: [...searchValues[key], val] };
      }
    } else {
      updated = { [key]: val };
    }

    updateSearchValues(prev => ({ ...prev, ...updated }));
  };

  const {
    movieSearchCancel,
    movieSearch,
    movieSearchIsFetching,
    movieSearchClear,
    movieAllIsFetching,
    movieFetch,
  } = useMovies();

  const handleMovieSearch = () => {
    if (!movieSearchIsFetching) {
      movieSearch(searchValues);
    }
  };

  const handleMovieSearchClear = () => {
    if (!movieAllIsFetching) {
      movieFetch();
    }
    movieSearchClear();
  };

  const {
    groupListArray,
    groupFetch,
    groupFetchCancel,
    groupAllIsFetching,
  } = useGroupsHook();

  const {
    catFetch,
    catFetchCancel,
    catListArray,
    catAllIsFetching,
  } = useCategoriesStore();

  const {
    tagsFetch,
    tagsFetchCancel,
    tagsListArray,
    tagsIsFetching,
  } = useTagsStore();

  useEffect(() => {
    if (!catAllIsFetching) {
      catFetch();
    }
    if (!tagsIsFetching) {
      tagsFetch();
    }
    if (!groupAllIsFetching) {
      groupFetch();
    }

    return () => {
      if (catAllIsFetching) {
        catFetchCancel();
      }
      if (catAllIsFetching) {
        tagsFetchCancel();
      }
      if (groupAllIsFetching) {
        groupFetchCancel();
      }
      if (movieSearchIsFetching) {
        movieSearchCancel();
      }
    };
  }, []);

  return (
    <SearchStyled>
      {movieSearchIsFetching && <Loading />}
      <SidebarTitle title={'Current Tags:'}>
        <Title>
          <h4>Search:</h4>{' '}
          <IconButton size='small' onClick={handleMovieSearchClear}>
            <RefreshIcon />
          </IconButton>
        </Title>
      </SidebarTitle>
      <UserInputs>
        <Input
          value={name}
          placeholder='movie name'
          fullWidth
          label='Name:'
          onChange={({ target: { value } }) =>
            handleUpdateEditor('name', value)
          }
        >
          {name}
        </Input>
        <CheckList>
          <CheckListTitle>
            Groups:
            <IconButton
              color='secondary'
              size='small'
              onClick={() =>
                updateSearchValues({
                  ...searchValues,
                  groups: [],
                })
              }
            >
              <BackspaceIcon />
            </IconButton>
          </CheckListTitle>
          <div className='list'>
            {groupListArray.map(({ id, name: itemName, amount }) => (
              <FormControlLabel
                key={`group-${itemName}`}
                control={
                  <Checkbox
                    checked={groups.includes(id)}
                    onChange={() => handleUpdateEditor('groups', id)}
                  />
                }
                label={
                  <CheckboxLabel>
                    {itemName} <span className='amount'>{amount}</span>
                  </CheckboxLabel>
                }
              />
            ))}
          </div>
        </CheckList>
        <CheckList>
          <CheckListTitle>
            Categories:
            <IconButton
              color='secondary'
              size='small'
              onClick={() =>
                updateSearchValues({
                  ...searchValues,
                  categories: [],
                })
              }
            >
              <BackspaceIcon />
            </IconButton>
          </CheckListTitle>
          <div className='list'>
            {catListArray.map(({ id, name: itemName, amount }) => (
              <FormControlLabel
                key={`cat-${itemName}`}
                control={
                  <Checkbox
                    checked={categories.includes(id)}
                    onChange={() => handleUpdateEditor('categories', id)}
                  />
                }
                label={
                  <CheckboxLabel>
                    {itemName} <span className='amount'>{amount}</span>
                  </CheckboxLabel>
                }
              />
            ))}
          </div>
        </CheckList>
        <CheckList>
          <CheckListTitle>
            Tags:
            <IconButton
              color='secondary'
              size='small'
              onClick={() =>
                updateSearchValues({
                  ...searchValues,
                  tags: [],
                })
              }
            >
              <BackspaceIcon />
            </IconButton>
          </CheckListTitle>
          <div className='list'>
            {tagsListArray.map(({ id, name: itemName, amount }) => (
              <FormControlLabel
                key={`tag-${itemName}`}
                control={
                  <Checkbox
                    checked={tags.includes(id)}
                    onChange={() => handleUpdateEditor('tags', id)}
                  />
                }
                label={
                  <CheckboxLabel>
                    {itemName} <span className='amount'>{amount}</span>
                  </CheckboxLabel>
                }
              />
            ))}
          </div>
        </CheckList>
      </UserInputs>
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleMovieSearch}
          disabled={
            movieSearchIsFetching ||
            Object.values(searchValues).filter(val => val.length > 0).length < 1
          }
        >
          Search
        </Button>
      </Submit>
    </SearchStyled>
  );
};

export default Search;
