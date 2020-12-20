// External
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useMovies } from '~Modules/movies/hooks';
import Info from './Info';
import { Delete as DeleteStyled, Movies, Submit, Input } from './Delete_';

// Constants

const Delete = () => {
  const [filterVal, updateFilterVal] = useState('');
  const [inputValues, updateInputValues] = useState({
    id: '',
  });
  const { movieListArray, movieDelete, movieDeleteIsFetching } = useMovies();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleDeleteMovie = () => {
    if (!movieDeleteIsFetching) {
      movieDelete(inputValues);
      handleUpdateInputValues({ id: '' });
    }
  };

  return (
    <DeleteStyled>
      <Movies>
        <div className='title'>Categories:</div>
        <Input
          label='Filter Movies:'
          value={filterVal}
          onChange={({ target: { value } }) => updateFilterVal(value)}
        />
        <RadioGroup
          className='list'
          aria-label='movie'
          name='movie'
          value={inputValues.id}
          onChange={e => handleUpdateInputValues({ id: +e.target.value })}
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

      <Info selectedId={inputValues.id} />

      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleDeleteMovie}
          disabled={
            Object.entries(inputValues).filter(([_, val]) => !val).length > 0
          }
        >
          Delete Movie
        </Button>
      </Submit>
    </DeleteStyled>
  );
};

export default Delete;
