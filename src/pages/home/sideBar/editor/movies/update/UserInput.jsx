// External
import { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { oneOfType, shape, string, array, number, func } from 'prop-types';

// Internal
import { useCategoriesStore } from '~Modules/categories/hooks';
import { useTagsStore } from '~Modules/tags/hooks';
import { useGroupsHook } from '~Modules/groups/hooks';
import {
  UserInput as UserInputStyled,
  Input,
  Select,
  CheckList,
  CheckListTitle,
  CheckboxLabel,
  TextField,
} from './UserInput_';

// Constants
const UserInputs = ({
  updateValues,
  inputValues: { name, category_id, group_id, related_group_ids, tags, notes },
}) => {
  const { catListArray } = useCategoriesStore();
  const { tagsListArray } = useTagsStore();
  const { groupListArray } = useGroupsHook();

  useEffect(() => {
    if (related_group_ids.includes(+group_id)) {
      updateValues({
        related_group_ids: related_group_ids.filter(id => id !== +group_id),
      });
    }
  }, [group_id, related_group_ids, updateValues]);

  return (
    <UserInputStyled>
      <div className='title'>Fields: </div>
      <Input
        label='Movie Name'
        value={name}
        placeholder={name || 'Name...'}
        onChange={e => updateValues({ name: e.target.value })}
        required
      />
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-update-movie-cat'>
          Movie Category:
        </InputLabel>
        <Select
          inputProps={{
            name: 'editorUpdateMovieCat',
            id: 'editor-update-movie-cat',
          }}
          value={category_id}
          onChange={({ target: { value } }) => {
            updateValues({
              category_id: value,
            });
          }}
          native
        >
          <option aria-label='None' value='' />
          {catListArray.map(({ name: catName, id }) => (
            <option key={`cat-${id}`} value={id}>
              {catName}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-update-movie-group'>
          Movie Group:
        </InputLabel>
        <Select
          inputProps={{
            name: 'editorUpdateMovieGroup',
            id: 'editor-update-movie-group',
          }}
          value={group_id}
          onChange={({ target: { value } }) => {
            updateValues({
              group_id: value,
            });
          }}
          native
        >
          <option aria-label='None' value='' />
          {groupListArray.map(({ name: groupName, id }) => (
            <option key={`group-${id}`} value={id}>
              {groupName}
            </option>
          ))}
        </Select>
      </FormControl>
      <CheckList>
        <CheckListTitle>Tags:</CheckListTitle>
        <div className='list'>
          {groupListArray
            .filter(({ id }) => id !== +group_id)
            .map(({ id, name: groupName }) => (
              <FormControlLabel
                key={`group-${groupName}`}
                control={
                  <Checkbox
                    checked={related_group_ids.includes(id)}
                    onChange={() => {
                      let newRelated;
                      if (related_group_ids.includes(id)) {
                        newRelated = related_group_ids.filter(
                          itemId => id !== itemId
                        );
                      } else {
                        newRelated = [...related_group_ids, id];
                      }
                      updateValues({ related_group_ids: newRelated });
                    }}
                  />
                }
                label={<CheckboxLabel>{groupName}</CheckboxLabel>}
              />
            ))}
        </div>
      </CheckList>
      <CheckList>
        <CheckListTitle>Related Groups:</CheckListTitle>
        <div className='list'>
          {tagsListArray.map(({ id, name: tagName }) => (
            <FormControlLabel
              key={`tag-${tagName}`}
              control={
                <Checkbox
                  checked={tags.includes(id)}
                  onChange={() => {
                    let newTags;
                    if (tags.includes(id)) {
                      newTags = tags.filter(itemId => id !== itemId);
                    } else {
                      newTags = [...tags, id];
                    }
                    updateValues({ tags: newTags });
                  }}
                />
              }
              label={<CheckboxLabel>{tagName}</CheckboxLabel>}
            />
          ))}
        </div>
      </CheckList>
      <TextField
        id='editor-update-movie-notes'
        label='Notes:'
        multiline
        rowsMax={4}
        value={notes}
        onChange={({ target: { value } }) => updateValues({ notes: value })}
      />
    </UserInputStyled>
  );
};

UserInputs.propTypes = {
  inputValues: shape({
    name: string,
    category_id: oneOfType([number, string]),
    group_id: oneOfType([number, string]),
    related_group_ids: array,
    tags: array,
    notes: string,
  }),
  updateValues: func.isRequired,
};

UserInputs.defaultProps = {};

export default UserInputs;
