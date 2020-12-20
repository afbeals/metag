// External
import { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useMovies } from '~Modules/movies/hooks';
import { UserInput } from './update/';
import Info from './Info';
import { Update as UpdateStyled, Movies, Submit, Input } from './Update_';

// Constants

const Update = () => {
  const [filterVal, updateFilterVal] = useState('');
  const [inputValues, updateInputValues] = useState({
    movie_id: null,
    name: '',
    category_id: '',
    group_id: '',
    related_group_ids: [],
    tags: [],
    notes: '',
  });
  const {
    movieList,
    movieListArray,
    movieUpdate,
    movieUpdateIsFetching,
  } = useMovies();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleUpdateMovie = () => {
    if (!movieUpdateIsFetching) {
      movieUpdate(inputValues);
      handleUpdateInputValues({
        movie_id: null,
        name: '',
        category_id: '',
        group_id: '',
        related_group_ids: [],
        tags: [],
        notes: '',
      });
    }
  };

  useEffect(() => {
    if (inputValues.movie_id !== null) {
      const mId = inputValues.movie_id;
      const newInputs = {
        name: movieList[mId].name,
        category_id: movieList[mId].category_id || '',
        group_id: movieList[mId].group_id || '',
        related_group_ids: movieList[mId].alt_group || [],
        tags: movieList[mId].tag_ids || [],
        notes: movieList[mId].notes || '',
      };

      handleUpdateInputValues(newInputs);
    }
  }, [inputValues.movie_id, movieList]);

  return (
    <UpdateStyled>
      <Input
        label='Filter Movies:'
        value={filterVal}
        onChange={({ target: { value } }) => updateFilterVal(value)}
      />
      <Movies>
        <div className='title'>Movies:</div>
        <RadioGroup
          className='list'
          aria-label='movies'
          name='movies'
          value={inputValues.movie_id}
          onChange={e => handleUpdateInputValues({ movie_id: +e.target.value })}
        >
          {movieListArray
            .filter(({ name }) =>
              filterVal
                ? name.toLowerCase().includes(filterVal.toLowerCase())
                : true
            )
            .map(({ id, name }) => (
              <FormControlLabel
                key={id}
                value={id}
                control={<Radio />}
                label={name}
              />
            ))}
        </RadioGroup>
      </Movies>
      <Info selectedId={inputValues.movie_id} />
      <UserInput
        inputValues={inputValues}
        updateValues={handleUpdateInputValues}
      />
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleUpdateMovie}
          disabled={
            inputValues.name.length < 1 &&
            (inputValues.group_id.length < 1 ||
              inputValues.category_id.length < 1)
          }
        >
          Update Movie
        </Button>
      </Submit>
    </UpdateStyled>
  );
};

export default Update;
