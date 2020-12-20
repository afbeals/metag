// External
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useGroupsHook } from '~Modules/groups/hooks';
import { Delete as DeleteStyled, Groups, Info, Submit } from './Delete_';

// Constants

const Delete = () => {
  const [inputValues, updateInputValues] = useState({
    id: '',
  });
  const [selectedGroup, updateSelected] = useState('');
  const {
    groupList,
    groupListArray,
    groupDelete,
    getDeleteIsFetching,
  } = useGroupsHook();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleDeleteGroup = () => {
    if (!getDeleteIsFetching) {
      groupDelete(inputValues);
      updateSelected('');
      handleUpdateInputValues({ id: '' });
    }
  };

  return (
    <DeleteStyled>
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
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleDeleteGroup}
          disabled={
            Object.entries(inputValues).filter(([_, val]) => !val).length > 0
          }
        >
          Delete Group
        </Button>
      </Submit>
    </DeleteStyled>
  );
};

export default Delete;
