// External
import styled from '@emotion/styled/macro';
import MaterialTextField from '@material-ui/core/TextField';

// Internal
import {
  primaryDark,
  fontColorPrimary,
  fontColorSecondary,
} from '~Styles/abstract/_variables';

export const Delete = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Movies = styled.div`
  max-height: 65%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 5px;
    background: ${primaryDark};
    color: ${fontColorPrimary};
  }
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

export const Submit = styled.div`
  margin-top: auto;
  button {
    margin-top: auto !important;
    border-radius: 0 !important;
  }
`;

export const Input = styled(MaterialTextField)`
  input {
    color: ${fontColorSecondary} !important;
  }
`;

export default {
  Delete,
  Movies,
  Submit,
  Input,
};
