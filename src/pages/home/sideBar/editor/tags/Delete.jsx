// External
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useTagsStore } from '~Modules/tags/hooks';
import { Delete as DeleteStyled, Tags, Info, Submit } from './Delete_';

// Constants

const Delete = () => {
  const [inputValues, updateInputValues] = useState({
    id: '',
  });
  const [selectedTag, updateSelected] = useState('');
  const {
    tagsList,
    tagsListArray,
    tagsDelete,
    tagDeleteIsFetching,
  } = useTagsStore();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleDeleteTag = () => {
    if (!tagDeleteIsFetching) {
      tagsDelete(inputValues);
      updateSelected('');
      handleUpdateInputValues({ id: '' });
    }
  };

  return (
    <DeleteStyled>
      <Tags>
        <div className='title'>Tags:</div>
        <RadioGroup
          className='list'
          aria-label='tag'
          name='tag'
          value={selectedTag}
          onChange={e => {
            updateSelected(e.target.value);
            handleUpdateInputValues({ id: e.target.value });
          }}
        >
          {tagsListArray.map(({ id, name }) => (
            <FormControlLabel
              key={id}
              value={String(id)}
              control={<Radio />}
              label={name}
            />
          ))}
        </RadioGroup>
      </Tags>
      {!!selectedTag && (
        <Info>
          <div className='line'>
            <span>name: </span>
            <p>{tagsList[selectedTag].name}</p>
          </div>
          <div className='line'>
            <span>created: </span>{' '}
            <p>{new Date(tagsList[selectedTag].date).toDateString()}</p>
          </div>
          <div className='line'>
            <span>amount:</span>
            <p>{tagsList[selectedTag].amount}</p>
          </div>
        </Info>
      )}
      <Submit>
        <Button
          color='primary'
          fullWidth
          variant='contained'
          onClick={handleDeleteTag}
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
