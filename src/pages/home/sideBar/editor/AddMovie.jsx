// External
import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';

// Internal
import { api } from '~GlobalUtil/';
import { Modal } from '~Components/';
import { useCategoriesStore } from '~Modules/categories/hooks';
import { useTagsStore } from '~Modules/tags/hooks';
import { useMovies } from '~Modules/movies/hooks';
import constants from '~GlobalUtil/constants';
import {
  AddMovie as AddMovieStyled,
  Input,
  Select,
  Button,
  MovieSelector,
  MenuItem,
  TextField,
} from './AddMovie_';

// Constants
const {
  API: {
    ROOT,
    MOVIES: { STREAM },
  },
} = constants;

const AddMovie = () => {
  const [showMovie, updateShowMovie] = useState(false);
  const [availableMovies, updateAvailabeMovies] = useState([]);
  const [editorValues, updateEditorValues] = useState({
    tag_ids: [],
    category_id: '',
    file_src: '',
    name: '',
    notes: '',
  });

  const handleUpdateEditor = (val = {}) => {
    updateEditorValues(prev => ({ ...prev, ...val }));
  };

  const { movieFetch } = useMovies();

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
    return () => {
      if (catAllIsFetching) {
        catFetchCancel();
      }
      if (catAllIsFetching) {
        tagsFetchCancel();
      }
    };
  }, []);

  const handleAddMovie = () => {
    api.movie.add(editorValues).then(() => {
      movieFetch();
      const newList = availableMovies.filter(
        ({ file }) => file !== editorValues.file_src
      );
      handleUpdateEditor({
        tag_ids: [],
        file_src: '',
        name: '',
        note: '',
      });
      updateAvailabeMovies(newList);
    });
  };

  useEffect(() => {
    if (editorValues.category_id) {
      api.movie
        .avail({ category: editorValues.category_id })
        .then(({ data }) => {
          const normalizedData = data.map(d => ({
            file: d,
            name: d.substring(0, d.indexOf('.')),
          }));
          updateAvailabeMovies(normalizedData);
        });
    }
  }, [editorValues.category_id]);

  return (
    <AddMovieStyled>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-add-movie-categories'>Category:</InputLabel>
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
          <option aria-label='None' value='' disabled />
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
              // eslint-disable-next-line max-len
              src={`${ROOT}${STREAM}?suggestedPath=${editorValues.file_src}&suggestedCat=${editorValues.category_id}`}
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
        disabled={Object.values(editorValues).filter(val => !val).length > 0}
      >
        Add Movie
      </Button>
    </AddMovieStyled>
  );
};

AddMovie.defaultProps = {};
AddMovie.propTypes = {};

export default AddMovie;
