// External
import FormControl from '@material-ui/core/FormControl';
import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';

// Internal
import api from '~GlobalUtil/api';
import { useCategoriesStore } from '~Modules/categories/hooks';
import { Add as AddStyled, Select, Input, Button } from './Add_';

// Constants

const Add = () => {
  const { catAddIsFetching, catAdd } = useCategoriesStore();
  const [availableCats, updateAvailableCats] = useState([]);
  const [editorValues, updateEditorValues] = useState({
    name: '',
    src_folder: '',
  });

  const handleUpdateEditor = (val = {}) => {
    updateEditorValues(prev => ({ ...prev, ...val }));
  };

  useEffect(() => {
    api.cat.fetchAvail().then(({ data }) => updateAvailableCats(data));
  }, []);

  const handleAddCat = () => {
    if (!catAddIsFetching) {
      catAdd(editorValues);
      const newList = availableCats.filter(
        file => file !== editorValues.src_folder
      );
      updateAvailableCats(newList);
      handleUpdateEditor({
        name: '',
        src_folder: '',
      });
    }
  };

  return (
    <AddStyled>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='editor-add-cat-available'>
          Available Categories:
        </InputLabel>
        <Select
          label='Available Categories:'
          value={editorValues.src_folder}
          onChange={({ target: { value } }) =>
            handleUpdateEditor({ src_folder: value })
          }
          inputProps={{
            name: 'editorAddCatAvailable',
            id: 'editor-add-cat-available',
          }}
          native
          color='secondary'
        >
          <option aria-label='None' value='' disabled />
          {availableCats.map(name => (
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
        onClick={handleAddCat}
        disabled={
          catAddIsFetching ||
          Object.values(editorValues).filter(val => !val).length > 0
        }
      >
        Add Category
      </Button>
    </AddStyled>
  );
};

Add.defaultProps = {};
Add.propTypes = {};

export default Add;
