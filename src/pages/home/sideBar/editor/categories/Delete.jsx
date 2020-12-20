// External
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useCategoriesStore } from '~Modules/categories/hooks';
import { Delete as DeleteStyled, Tags, Info, Submit } from './Delete_';

// Constants

const Delete = () => {
  const [inputValues, updateInputValues] = useState({
    id: '',
  });
  const [selectedCategory, updateSelected] = useState('');
  const {
    catList,
    catListArray,
    catDelete,
    catDeleteIsFetching,
  } = useCategoriesStore();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleDeleteCategory = () => {
    if (!catDeleteIsFetching) {
      catDelete(inputValues);
      updateSelected('');
      handleUpdateInputValues({ id: '' });
    }
  };

  return (
    <DeleteStyled>
      <Tags>
        <div className='title'>Categories:</div>
        <RadioGroup
          className='list'
          aria-label='category'
          name='category'
          value={selectedCategory}
          onChange={e => {
            updateSelected(e.target.value);
            handleUpdateInputValues({ id: e.target.value });
          }}
        >
          {catListArray.map(({ id, name }) => (
            <FormControlLabel
              key={id}
              value={String(id)}
              control={<Radio />}
              label={name}
            />
          ))}
        </RadioGroup>
      </Tags>
      {!!selectedCategory && (
        <Info>
          <div className='line'>
            <span>name: </span>
            <p>{catList[selectedCategory].name}</p>
          </div>
          <div className='line'>
            <span>created: </span>{' '}
            <p>{new Date(catList[selectedCategory].date).toDateString()}</p>
          </div>
          <div className='line'>
            <span>amount:</span>
            <p>{catList[selectedCategory].amount}</p>
          </div>
        </Info>
      )}
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleDeleteCategory}
          disabled={
            Object.entries(inputValues).filter(([_, val]) => !val).length > 0
          }
        >
          Delete Category
        </Button>
      </Submit>
    </DeleteStyled>
  );
};

export default Delete;
