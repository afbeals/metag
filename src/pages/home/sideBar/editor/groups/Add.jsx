// External
import FormControl from '@material-ui/core/FormControl';
import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';

// Internal
import api from '~GlobalUtil/api';
import { useGroupsHook } from '~Modules/groups/hooks';
import { Add as AddStyled, Select, Input, Button } from './Add_';

// Constants

const Add = () => {
  const { groupAddIsFetching, groupAdd } = useGroupsHook();
  const [availableGroups, updateAvailableGroups] = useState([]);
  const [editorValues, updateEditorValues] = useState({
    name: '',
    src_folder: '',
  });

  const handleUpdateEditor = (val = {}) => {
    updateEditorValues(prev => ({ ...prev, ...val }));
  };

  useEffect(() => {
    api.group.get_avail().then(({ data }) => updateAvailableGroups(data));
  }, []);

  const handleAddGroup = () => {
    if (!groupAddIsFetching) {
      groupAdd(editorValues);
      const newList = availableGroups.filter(
        file => file !== editorValues.src_folder
      );
      updateAvailableGroups(newList);
      handleUpdateEditor({
        name: '',
        src_folder: '',
      });
    }
  };

  return (
    <AddStyled>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-add-group-available'>
          Available Groups:
        </InputLabel>
        <Select
          label='Available Groups:'
          value={editorValues.src_folder}
          onChange={({ target: { value } }) =>
            handleUpdateEditor({ src_folder: value })
          }
          inputProps={{
            name: 'editorAddGroupAvailable',
            id: 'editor-add-group-available',
          }}
          native
          color='secondary'
        >
          <option aria-label='None' value='' disabled />
          {availableGroups.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Input
        value={editorValues.name}
        placeholder={editorValues.src_folder}
        fullWidth
        onChange={({ target: { value } }) =>
          handleUpdateEditor({ name: value })
        }
        color='primary'
        label='Name:'
      />
      <Button
        color='primary'
        fullWidth
        variant='contained'
        onClick={handleAddGroup}
        disabled={
          groupAddIsFetching ||
          Object.values(editorValues).filter(val => !val).length > 0
        }
      >
        Add Movie
      </Button>
    </AddStyled>
  );
};

Add.defaultProps = {};
Add.propTypes = {};

export default Add;
