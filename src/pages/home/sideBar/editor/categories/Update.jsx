// External
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useCategoriesStore } from '~Modules/categories/hooks';
import {
  Update as UpdateStyled,
  Categories,
  Info,
  UserInputs,
  Submit,
  Input,
} from './Update_';

// Constants

const Update = () => {
  const [inputValues, updateInputValues] = useState({
    id: '',
    category: '',
  });
  const [selectedCategory, updateSelected] = useState('');
  const {
    catList,
    catListArray,
    catUpdate,
    catUpdateIsFetching,
  } = useCategoriesStore();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleUpdateCategory = () => {
    if (!catUpdateIsFetching) {
      catUpdate(inputValues);
      handleUpdateInputValues({ category: '', id: '' });
    }
  };

  return (
    <UpdateStyled>
      <UserInputs>
        <div className='title'>Edit Fields: </div>
        <div className='name'>
          <Input
            onChange={({ target: { value } }) =>
              handleUpdateInputValues({ category: value })
            }
            placeholder={selectedCategory ? catList[selectedCategory].name : ''}
            value={inputValues.category}
            label='Name'
          />
        </div>
      </UserInputs>
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
      <Categories>
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
      </Categories>
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleUpdateCategory}
          disabled={
            Object.entries(inputValues).filter(([_, val]) => !val).length > 0
          }
        >
          Update Category
        </Button>
      </Submit>
    </UpdateStyled>
  );
};

export default Update;
