// External
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// Internal
import { useTagsStore } from '~Modules/tags/hooks';
import {
  Update as UpdateStyled,
  Tags,
  Info,
  UserInputs,
  Submit,
  Input,
} from './Update_';

// Constants

const Update = () => {
  const [inputValues, updateInputValues] = useState({
    id: '',
    tag: '',
  });
  const [selectedTag, updateSelected] = useState('');
  const {
    tagsList,
    tagsListArray,
    tagsUpdate,
    tagUpdateIsFetching,
  } = useTagsStore();

  const handleUpdateInputValues = (val = {}) => {
    updateInputValues(prev => ({ ...prev, ...val }));
  };

  const handleUpdateGroup = () => {
    if (!tagUpdateIsFetching) {
      tagsUpdate(inputValues);
      handleUpdateInputValues({ tag: '', id: '' });
    }
  };

  return (
    <UpdateStyled>
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
      <UserInputs>
        <div className='title'>Edit Fields: </div>
        <div className='name'>
          <Input
            onChange={({ target: { value } }) =>
              handleUpdateInputValues({ tag: value })
            }
            placeholder={selectedTag ? tagsList[selectedTag].name : ''}
            value={inputValues.tag}
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
          Update Tag
        </Button>
      </Submit>
    </UpdateStyled>
  );
};

export default Update;
