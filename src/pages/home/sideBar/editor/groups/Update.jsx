// External
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useGroupsHook } from '~Modules/groups/hooks';
import {
  Update as UpdateStyled,
  Groups,
  Info,
  UserInputs,
  Submit,
  Input,
} from './Update_';

// Constants

const Update = () => {
  const [inputValues, updateInputValues] = useState({
    id: '',
    group: '',
  });
  const [selectedGroup, updateSelected] = useState('');
  const {
    groupList,
    groupListArray,
    groupUpdate,
    getUpdateIsFetching,
  } = useGroupsHook();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleUpdateGroup = () => {
    if (!getUpdateIsFetching) {
      groupUpdate(inputValues);
      handleUpdateInputValues({ group: '', id: '' });
    }
  };

  return (
    <UpdateStyled>
      <Groups>
        <div className='title'>Groups:</div>
        <RadioGroup
          className='list'
          aria-label='group'
          name='group'
          value={selectedGroup}
          onChange={e => {
            updateSelected(e.target.value);
            handleUpdateInputValues({ id: e.target.value });
          }}
        >
          {groupListArray.map(({ id, name }) => (
            <FormControlLabel
              key={id}
              value={String(id)}
              control={<Radio />}
              label={name}
            />
          ))}
        </RadioGroup>
      </Groups>
      {!!selectedGroup && (
        <Info>
          <div className='line'>
            <span>name: </span>
            <p>{groupList[selectedGroup].name}</p>
          </div>
          <div className='line'>
            <span>created: </span>{' '}
            <p>{new Date(groupList[selectedGroup].date).toDateString()}</p>
          </div>
          <div className='line'>
            <span>amount:</span>
            <p>{groupList[selectedGroup].amount}</p>
          </div>
        </Info>
      )}
      <UserInputs>
        <div className='title'>Edit Fields: </div>
        <div className='name'>
          <Input
            onChange={({ target: { value } }) =>
              handleUpdateInputValues({ group: value })
            }
            placeholder={selectedGroup ? groupList[selectedGroup].name : ''}
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
          Update Group
        </Button>
      </Submit>
    </UpdateStyled>
  );
};

export default Update;
