// External
import styled from '@emotion/styled/macro';
import MaterialTextField from '@material-ui/core/TextField';

// Internal
import {
  primaryDark,
  secondaryDark,
  fontColorPrimary,
  fontColorSecondary,
} from '~Styles/abstract/_variables';

export const Update = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Categories = styled.div`
  max-height: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-transform: capitalize;
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

export const Info = styled.div`
  padding: 5px;
  background: ${secondaryDark};
  color: ${fontColorPrimary};
  .line {
    margin: 5px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      text-transform: capitalize;
    }
    p {
      border: inset 1px #cdcdcd;
      background: #00000042;
      letter-spacing: 0.75px;
      flex-grow: 1;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      padding: 1px 10px;
      margin-left: 10px;
      font-style: italic;
    }
  }
`;
export const UserInputs = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
  .name {
  }
`;

export const Input = styled(MaterialTextField)`
  input {
    color: ${fontColorSecondary} !important;
  }
`;

export const Submit = styled.div`
  button {
    margin-top: auto !important;
    border-radius: 0 !important;
  }
`;

export default {
  Update,
  Categories,
  Info,
  UserInputs,
  Submit,
  Input,
};
