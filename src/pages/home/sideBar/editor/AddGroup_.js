// External
import styled from '@emotion/styled/macro';
import MaterialSelect from '@material-ui/core/Select';
import MaterialButton from '@material-ui/core/Button';
import MaterialTextField from '@material-ui/core/TextField';

// Internal
import { fontColorSecondary } from '~Styles/abstract/_variables';

export const AddGroup = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: '1',
}));

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

export default {
  AddGroup,
  Input,
  Select,
  Button,
};
