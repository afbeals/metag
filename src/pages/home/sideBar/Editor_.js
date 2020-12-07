// External
import styled from '@emotion/styled/macro';
import Select from '@material-ui/core/Select';

// Internal
import { secondaryDark } from '~Styles/abstract/_variables';

export const Editor = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Selector = styled(Select)`
  select {
    text-transform: capitalize;
    background-color: ${secondaryDark} !important;
  }
`;

export const NoSelection = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export default {
  Editor,
  NoSelection,
  Selector,
};
