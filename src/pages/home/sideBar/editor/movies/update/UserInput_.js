// External
import styled from '@emotion/styled/macro';
import MaterialTextField from '@material-ui/core/TextField';
import MaterialSelect from '@material-ui/core/Select';

// Internal
import {
  primaryDark,
  secondary,
  fontColorPrimary,
  fontColorSecondary,
} from '~Styles/abstract/_variables';

export const UserInput = styled.div`
  max-height: 70%;
  font-size: 1em;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    background: ${primaryDark};
    color: ${fontColorPrimary};
    text-transform: capitalize;
  }
`;

export const Select = styled(MaterialSelect)`
  color: ${fontColorSecondary} !important;
  option {
    color: ${fontColorSecondary} !important;
  }
`;

export const Input = styled(MaterialTextField)`
  input {
    color: ${fontColorSecondary} !important;
  }
`;

export const CheckList = styled.div`
  max-height: 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .list {
    width: 100%;
    max-height: 92%;
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 0.5em;
    .MuiSvgIcon-root {
      font-size: 0.75em;
    }
    .MuiFormControlLabel-label {
      width: 100%;
      font-size: 1.75em;
    }
    .MuiFormControlLabel-root {
      margin-left: 0;
      margin-right: 0;
      width: 100%;
      padding-right: 8px;
      &:hover {
        background: #cbcbcb;
      }
    }
  }
`;

export const CheckListTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px 5px;
  background: ${primaryDark};
  color: ${fontColorPrimary};
  .MuiSvgIcon-root {
    height: 0.75em;
    width: 0.75em;
  }
`;

export const CheckboxLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  .amount {
    font-size: 0.8em;
    background: ${secondary};
    padding: 1px 6px;
    border-radius: 30px;
    color: ${fontColorPrimary};
  }
`;

export const TextField = styled(MaterialTextField)`
  #editor-update-movie-notes {
    color: ${fontColorSecondary} !important;
  }
`;

export default {
  CheckListTitle,
  CheckboxLabel,
  CheckList,
  UserInput,
  Select,
  Input,
  TextField,
};
