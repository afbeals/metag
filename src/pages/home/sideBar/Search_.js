// External
import styled from '@emotion/styled/macro';
import MaterialButton from '@material-ui/core/Button';
import MaterialTextField from '@material-ui/core/TextField';

//Internal
import {
  fontColorSecondary,
  secondary,
  primaryDark,
  fontColorPrimary,
} from '~Styles/abstract/_variables';

export const Search = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Button = styled(MaterialButton)`
  margin-top: auto !important;
  border-radius: 0 !important;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled(MaterialTextField)`
  input {
    color: ${fontColorSecondary} !important;
  }
`;

export const Submit = styled.div``;

export const UserInputs = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const CheckList = styled.div`
  max-height: 30%;
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

export default {
  CheckListTitle,
  CheckboxLabel,
  Button,
  Title,
  Search,
  Submit,
  CheckList,
  UserInputs,
};
