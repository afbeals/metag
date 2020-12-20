// External
import styled from '@emotion/styled/macro';
import MaterialTextField from '@material-ui/core/TextField';

// Internal
import {
  primaryDark,
  fontColorPrimary,
  fontColorSecondary,
} from '~Styles/abstract/_variables';

export const Create = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  height: 100%;
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

export const CurrentTags = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
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
    max-height: 90%;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
    > div {
      padding: 3px 4px;
      text-transform: capitalize;
      display: flex;
      flex-direction: row;
      width: 100%;
      p {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
`;

export default {
  CurrentTags,
  Create,
  UserInputs,
  Submit,
  Input,
};
