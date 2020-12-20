// External
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

// Internal
import { useCategoriesStore } from '~Modules/categories/hooks';
import {
  Create as CreateStyled,
  UserInputs,
  Submit,
  Input,
  CurrentTags,
} from './Create_';

// Constants

const Create = () => {
  const [inputValues, updateInputValues] = useState({
    category: '',
  });

  const {
    catCreate,
    catCreateIsFetching,
    catListArray,
    catAllIsFetching,
    catFetch,
    catFetchCancel,
  } = useCategoriesStore();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleUpdateCat = () => {
    if (!catCreateIsFetching) {
      catCreate(inputValues);
      handleUpdateInputValues({ category: '' });
    }
  };

  useEffect(() => {
    if (!catAllIsFetching) {
      catFetch();
    }
    return () => {
      if (catAllIsFetching) {
        catFetchCancel();
      }
    };
  }, []);

  return (
    <CreateStyled>
      <CurrentTags>
        <div className='title'>Current Categories:</div>
        <div className='list'>
          {catListArray.map(({ id, name, amount }) => (
            <div key={id}>
              <p>
                {name} <span>{amount}</span>
              </p>
            </div>
          ))}
        </div>
      </CurrentTags>
      <UserInputs>
        <div className='title'>Category Info: </div>
        <div className='name'>
          <Input
            onChange={({ target: { value } }) =>
              handleUpdateInputValues({ category: value })
            }
            placeholder='Category Name...'
            helperText={
              catListArray.filter(
                ({ name }) =>
                  name.toLowerCase() === inputValues.category.toLowerCase()
              ).length > 0 && 'Category already exists'
            }
            value={inputValues.category}
            label='Name'
          />
        </div>
      </UserInputs>
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleUpdateCat}
          disabled={
            Object.entries(inputValues).filter(([_, val]) => !val).length > 0 ||
            catListArray.filter(
              ({ name }) =>
                name.toLowerCase() === inputValues.category.toLowerCase()
            ).length > 0
          }
        >
          Create Category
        </Button>
      </Submit>
    </CreateStyled>
  );
};

export default Create;
