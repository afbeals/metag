// External
import styled from '@emotion/styled/macro';
import MaterialSelect from '@material-ui/core/Select';
import MaterialButton from '@material-ui/core/Button';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import MaterialTextField from '@material-ui/core/TextField';

// Internal
import { fontColorSecondary } from '~Styles/abstract/_variables';

export const Add = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Input = styled(MaterialTextField)`
  input {
    color: ${fontColorSecondary} !important;
  }
`;

export const Select = styled(MaterialSelect)`
  color: ${fontColorSecondary} !important;
`;

export const Button = styled(MaterialButton)`
  margin-top: auto !important;
  border-radius: 0 !important;
`;

export const MenuItem = styled(MaterialMenuItem)`
  color: ${fontColorSecondary} !important;
`;

export const TextField = styled(MaterialTextField)`
  #editor-add-movie-tags {
    color: ${fontColorSecondary} !important;
  }
`;

export const MovieSelector = styled.div`
  display: flex;
  flex-direction: revert;
  align-items: center;
  justify-content: center;
`;

export default {
  Add,
  MenuItem,
  MovieSelector,
  Input,
  Select,
  TextField,
  Button,
};
