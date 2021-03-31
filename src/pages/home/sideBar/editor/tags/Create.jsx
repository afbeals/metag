// External
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

// Internal
import { useTagsStore } from '~Modules/tags/hooks';
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
    tag: '',
  });

  const {
    tagsCreate,
    tagCreateIsFetching,
    tagsListArray,
    tagsIsFetching,
    tagsFetch,
    tagsFetchCancel,
  } = useTagsStore();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleUpdateGroup = () => {
    if (!tagCreateIsFetching) {
      tagsCreate(inputValues);
      handleUpdateInputValues({ tag: '' });
    }
  };

  useEffect(() => {
    if (!tagsIsFetching) {
      tagsFetch();
    }
    return () => {
      if (tagsIsFetching) {
        tagsFetchCancel();
      }
    };
  }, []);

  return (
    <CreateStyled>
      <UserInputs>
        <div className='title'>Tag Info: </div>
        <div className='name'>
          <Input
            onChange={({ target: { value } }) =>
              handleUpdateInputValues({ tag: value })
            }
            placeholder='Tag Name...'
            helperText={
              tagsListArray.filter(
                ({ name }) =>
                  name.toLowerCase() === inputValues.tag.toLowerCase()
              ).length > 0 && 'Tag already exists'
            }
            value={inputValues.tag}
            label='Name'
          />
        </div>
      </UserInputs>
      <CurrentTags>
        <div className='title'>Current Tags:</div>
        <div className='list'>
          {tagsListArray.map(({ id, name, amount }) => (
            <div key={id}>
              <p>
                {name} <span>{amount}</span>
              </p>
            </div>
          ))}
        </div>
      </CurrentTags>

      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleUpdateGroup}
          disabled={
            Object.entries(inputValues).filter(([_, val]) => !val).length > 0 ||
            tagsListArray.filter(
              ({ name }) => name.toLowerCase() === inputValues.tag.toLowerCase()
            ).length > 0
          }
        >
          Create Tag
        </Button>
      </Submit>
    </CreateStyled>
  );
};

export default Create;
