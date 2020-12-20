// External
import { useState } from 'react';
import Button from '@material-ui/core/Button';

// Internal
import { useGroupsHook } from '~Modules/groups/hooks';
import { Create as CreateStyled, UserInputs, Submit, Input } from './Create_';

// Constants

const Create = () => {
  const [inputValues, updateInputValues] = useState({
    group: '',
  });

  const { groupCreate, getCreateisFetching } = useGroupsHook();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleUpdateGroup = () => {
    if (!getCreateisFetching) {
      groupCreate(inputValues);
      handleUpdateInputValues({ group: '' });
    }
  };

  return (
    <CreateStyled>
      <UserInputs>
        <div className='title'>Group Info: </div>
        <div className='name'>
          <Input
            onChange={({ target: { value } }) =>
              handleUpdateInputValues({ group: value })
            }
            placeholder='Group Name...'
            value={inputValues.group}
            label='Name'
          />
        </div>
      </UserInputs>
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleUpdateGroup}
          disabled={
            Object.entries(inputValues).filter(([_, val]) => !val).length > 0
          }
        >
          Create Group
        </Button>
      </Submit>
    </CreateStyled>
  );
};

export default Create;
