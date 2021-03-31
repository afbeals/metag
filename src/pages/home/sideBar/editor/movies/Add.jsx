// External
import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';

// Internal
import { api } from '~GlobalUtil/';
import { Modal } from '~Components/';
import { useGroupsHook } from '~Modules/groups/hooks';
import { useCategoriesStore } from '~Modules/categories/hooks';
import { useTagsStore } from '~Modules/tags/hooks';
import { useMovies } from '~Modules/movies/hooks';
import constants from '~GlobalUtil/constants';
import {
  Add as AddStyled,
  Input,
  Select,
  Button,
  MovieSelector,
  MenuItem,
  TextField,
} from './Add_';

// Constants
const {
  API: {
    ROOT,
    MOVIES: { STREAM },
  },
} = constants;

const Add = () => {
  const [showMovie, updateShowMovie] = useState(false);
  const [availableMovies, updateAvailabeMovies] = useState([]);
  const [editorValues, updateEditorValues] = useState({
    tag_ids: [],
    category_id: '',
    file_src: '',
    name: '',
    notes: '',
    primary_group: '',
    related_groups: [],
  });

  const handleUpdateEditor = (val = {}) => {
    updateEditorValues(prev => ({ ...prev, ...val }));
  };

  const { movieAdd } = useMovies();

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
    };
  }, []);

  const handleAddMovie = () => {
    movieAdd(editorValues);
    handleUpdateEditor({
      tag_ids: [],
      file_src: '',
      name: '',
      notes: '',
      primary_group: '',
      related_groups: [],
    });
    const newList = availableMovies.filter(
      ({ file }) => file !== editorValues.file_src
    );
    updateAvailabeMovies(newList);
  };

  const isValid = () => {
    if (editorValues.name.length < 1) return true;
    if (
      editorValues.primary_group.length < 1 &&
      editorValues.category_id.length < 1
    )
      return true;
    if (editorValues.file_src.length < 1) return true;
    return false;
  };

  useEffect(() => {
    if (editorValues.primary_group) {
      api.movie
        .groupAvail({ group_id: editorValues.primary_group })
        .then(({ data: { filesList } }) => {
          const normalizedData = filesList.map(f => {
            const file = f;
            const splitFileArray = f.split('/');
            const fileName = splitFileArray[splitFileArray.length - 1];
            const parsedName = fileName
              .substring(0, fileName.lastIndexOf('.'))
              .replace(' - Shortcut', '');

            return {
              file,
              name: parsedName,
            };
          });
          updateAvailabeMovies(normalizedData);
        });
    }
  }, [editorValues.primary_group]);

  useEffect(() => {
    if (editorValues.category_id && !editorValues.primary_group) {
      api.movie
        .avail({ category: editorValues.category_id })
        .then(({ data }) => {
          const normalizedData = data.map(d => ({
            file: d,
            name: d.substring(0, d.lastIndexOf('.')),
          }));
          updateAvailabeMovies(normalizedData);
        });
    } else if (!editorValues.category_id && !editorValues.primary_group) {
      updateAvailabeMovies([]);
    }
  }, [editorValues.category_id, editorValues.primary_group]);

  return (
    <AddStyled>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-add-movie-groups'>Groups:</InputLabel>
        <Select
          label='Groups:'
          value={editorValues.primary_group}
          onChange={({ target: { value } }) =>
            handleUpdateEditor({ primary_group: +value })
          }
          inputProps={{
            name: 'editorAddMovieGroups',
            id: 'editor-add-movie-groups',
          }}
          native
          color='secondary'
        >
          <option aria-label='None' value='' />
          {groupListArray.map(({ name, id }) => (
            <option key={name} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-add-movie-relGroups'>
          Related Groups:
        </InputLabel>
        <Select
          disabled={!editorValues.primary_group}
          inputProps={{
            name: 'editorAddMovieRelGroups',
            id: 'editor-add-movie-relGroups',
          }}
          multiple
          value={editorValues.related_groups}
          onChange={({ target: { value } }) =>
            handleUpdateEditor({ related_groups: value })
          }
        >
          {groupListArray
            .filter(({ id }) => id !== editorValues.primary_group)
            .map(({ name, id }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-add-movie-categories'>
          {editorValues.primary_group ? <>Set </> : <>From </>}
          Category:
        </InputLabel>
        <Select
          label='Category:'
          value={editorValues.category_id}
          onChange={({ target: { value } }) =>
            handleUpdateEditor({ category_id: value })
          }
          inputProps={{
            name: 'editorAddMovieCategories',
            id: 'editor-add-movie-categories',
          }}
          native
          color='secondary'
        >
          <option aria-label='None' value='' />
          {catListArray.map(({ name, id }) => (
            <option key={name} value={id}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>

      <MovieSelector>
        <FormControl fullWidth variant='standard'>
          <InputLabel htmlFor='editor-add-movie-movie'>Movie:</InputLabel>
          <Select
            label='Movie:'
            value={editorValues.file_src}
            onChange={({ target: { value } }) => {
              const fileIndex = availableMovies.findIndex(
                ({ file }) => file === value
              );
              handleUpdateEditor({
                file_src: availableMovies[fileIndex].file,
              });
            }}
            inputProps={{
              name: 'editorAddMovieMovie',
              id: 'editor-add-movie-movie',
            }}
            native
          >
            <option aria-label='None' value='' disabled />
            {availableMovies.map(({ name, file }) => (
              <option key={name} value={file}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
        <IconButton
          disabled={!editorValues.file_src}
          color='primary'
          size='small'
          onClick={() => updateShowMovie(true)}
        >
          <VisibilityIcon />
        </IconButton>
        {showMovie && (
          <Modal
            title={null}
            onCancel={() => updateShowMovie(false)}
            onClose={() => updateShowMovie(false)}
          >
            <video
              controls
              autoPlay
              width='100%'
              muted
              // eslint-disable-next-line max-len
              src={`${ROOT}${STREAM}?suggestedPath=${editorValues.file_src}&${
                editorValues.primary_group
                  ? `suggestedGrp=${editorValues.primary_group}`
                  : `suggestedCat=${editorValues.category_id}`
              }`}
            >
              Sorry, your browser doesn't support embedded videos.
            </video>
          </Modal>
        )}
      </MovieSelector>

      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-add-movie-tags'>Tags:</InputLabel>
        <Select
          inputProps={{
            name: 'editorAddMovieTags',
            id: 'editor-add-movie-tags',
          }}
          multiple
          value={editorValues.tag_ids}
          onChange={({ target: { value } }) =>
            handleUpdateEditor({ tag_ids: value })
          }
        >
          {tagsListArray.map(({ name, id }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Input
        value={editorValues.name}
        placeholder={editorValues.file_src}
        fullWidth
        onChange={({ target: { value } }) =>
          handleUpdateEditor({ name: value })
        }
        color='primary'
        label='Name:'
      />
      <TextField
        id='editor-add-movie-tags'
        label='Notes:'
        multiline
        rowsMax={4}
        value={editorValues.notes}
        onChange={({ target: { value } }) =>
          handleUpdateEditor({ notes: value })
        }
      />

      <Button
        color='primary'
        fullWidth
        variant='contained'
        onClick={handleAddMovie}
        disabled={isValid()}
      >
        Add Movie
      </Button>
    </AddStyled>
  );
};

Add.defaultProps = {};
AddStyled.propTypes = {};

export default Add;
