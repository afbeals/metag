// External
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

// Internal
import { Editor as EditorStyled, Selector, NoSelection } from './Editor_.js';
import { AddMovie, AddGroup } from './editor/';
import ErrorBoundary from '~Components/ErrorBoundary';

// Constants
const options = {
  addMovie: {
    label: 'add Movie',
    comp: <AddMovie />,
    value: 'addMovie',
  },
  addGroup: {
    label: 'add Group',
    comp: <AddGroup />,
    value: 'addGroup',
  },
};

const Editor = () => {
  const [currentView, updateCurrentView] = useState('');

  const handleUpdateCurrentView = e => {
    const { value } = e.target;
    if (value !== currentView) updateCurrentView(value);
  };
  return (
    <ErrorBoundary>
      <EditorStyled>
        <FormControl fullWidth={true} variant='filled'>
          <InputLabel htmlFor='editor-selector'>Editor:</InputLabel>
          <Selector
            native
            value={currentView}
            onChange={handleUpdateCurrentView}
            label='Editor:'
            inputProps={{
              name: 'editorType',
              id: 'editor-selector',
            }}
          >
            <option aria-label='None' value='' disabled />
            {Object.entries(options).map(([key, { label, value }]) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
          </Selector>
        </FormControl>
        {!currentView && <NoSelection>No Editor Selected</NoSelection>}
        {currentView && options[currentView].comp}
      </EditorStyled>
    </ErrorBoundary>
  );
};

export default Editor;
