// External
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

// Internal
import { Editor as EditorStyled, Selector, NoSelection } from './Editor_.js';
import { Groups, Tags, Movies, Categories } from './editor/';
import ErrorBoundary from '~Components/ErrorBoundary';

// Constants
const options = {
  categories: {
    label: 'Categories',
    values: [
      {
        label: 'create Category',
        value: 'create',
      },
      {
        label: 'add Directory Category',
        value: 'add',
      },
      {
        label: 'update Category',
        value: 'update',
      },
      {
        label: 'delete Category',
        value: 'delete',
      },
    ],
  },
  group: {
    label: 'Groups',
    values: [
      {
        label: 'create Group',
        value: 'create',
      },
      {
        label: 'add Directory Group',
        value: 'add',
      },
      {
        label: 'update Group',
        value: 'update',
      },
      {
        label: 'delete Group',
        value: 'delete',
      },
    ],
  },
  movies: {
    label: 'Movies',
    values: [
      {
        label: 'add Movie',
        value: 'add',
      },
      {
        label: 'Update Movie',
        value: 'update',
      },
      {
        label: 'Delete Movie',
        value: 'delete',
      },
    ],
  },
  tags: {
    label: 'Tags',
    values: [
      {
        label: 'create Tag',
        value: 'create',
      },
      {
        label: 'update Tag',
        value: 'update',
      },
      {
        label: 'delete Tag',
        value: 'delete',
      },
    ],
  },
};

const selectRender = ({ section, view }) => {
  switch (section.toLowerCase()) {
    case 'group': {
      return <Groups view={view} />;
    }

    case 'categories': {
      return <Categories view={view} />;
    }

    case 'tags': {
      return <Tags view={view} />;
    }

    case 'movies': {
      return <Movies view={view} />;
    }

    default:
      return null;
  }
};

const Editor = () => {
  const [currentView, updateCurrentView] = useState([]);

  const handleUpdateCurrentView = e => {
    const { value } = e.target;
    const splitGroup = value.split(',');
    if (splitGroup[0] !== currentView[0] || splitGroup[1] !== currentView[1])
      updateCurrentView(splitGroup);
  };
  return (
    <ErrorBoundary>
      <EditorStyled>
        <FormControl fullWidth={true} variant='filled'>
          <InputLabel htmlFor='editor-selector'>Editor:</InputLabel>
          <Selector
            native
            value={currentView.join(',')}
            onChange={handleUpdateCurrentView}
            label='Editor:'
            inputProps={{
              name: 'editorType',
              id: 'editor-selector',
            }}
          >
            <option aria-label='None' value='' disabled />
            {Object.entries(options).map(
              ([group, { label: optGroup, values }]) => (
                <optgroup label={optGroup} key={group}>
                  {Object.entries(values).map(([key, { label, value }]) => (
                    <option key={key} value={`${group},${value}`}>
                      {label}
                    </option>
                  ))}
                </optgroup>
              )
            )}
          </Selector>
        </FormControl>
        {currentView.length < 1 && (
          <NoSelection>No Editor Selected</NoSelection>
        )}
        {currentView.length > 0 &&
          selectRender({ section: currentView[0], view: currentView[1] })}
      </EditorStyled>
    </ErrorBoundary>
  );
};

export default Editor;
