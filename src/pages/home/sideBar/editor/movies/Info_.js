// External
import styled from '@emotion/styled/macro';
import { IconButton } from '@material-ui/core';
// import MaterialTextField from '@material-ui/core/TextField';

// Internal
import {
  primaryDark,
  // secondaryLight,
  animSpeed,
  secondaryDark,
  fontColorPrimary,
  //   fontColorSecondary,
} from '~Styles/abstract/_variables';

export const Info = styled.div`
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
    span {
      margin-left: auto;
    }
  }
`;

export const Details = styled.div(({ isopen }) => ({
  transition: `max-height ${animSpeed}s`,
  background: secondaryDark,
  color: fontColorPrimary,
  maxHeight: '0px',
  overflowY: 'hidden',
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  ...(isopen && { maxHeight: '200px', overflowY: 'scroll' }),
  '.line': {
    margin: '5px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2px 5px',
    width: '100%',
    span: {
      textTransform: 'capitalize',
    },
    '>p:not(.noStyle)': {
      border: 'inset 1px #cdcdcd',
      background: '#00000042',
      letterSpacing: '0.75px',
      flexGrow: '1',
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      padding: '1px 10px',
      marginLeft: '10px',
      fontStyle: 'italic',
      minHeight: '16px',
    },
    '&.groups': {
      flexWrap: 'wrap',
      '.field': {
        border: 'inset 1px #cdcdcd',
        background: '#00000042',
        letterSpacing: '0.75px',
        flexGrow: '1',
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        padding: '1px 10px',
        marginLeft: '10px',
        fontStyle: 'italic',
        '&.primary': {
          width: '69%',
          'p.noStyle': {
            width: '98%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      },
      '.secondary': {
        marginLeft: 'auto',
        marginRight: '10px',
        width: '100%',
        '>div': {
          fontSize: '.75em',
          minHeight: '16px',

          '.tooltip': {
            maxWidth: '45px',
            '.altGroup': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          },
        },
      },
    },
  },
}));

export const Opener = styled(IconButton)(({ isopen }) => ({
  color: `${fontColorPrimary} !important`,
  padding: '0 !important',
  transform: 'rotate(180deg)',
  // eslint-disable-next-line max-len
  transition: `transform ${animSpeed}s linear, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important`,
  ...(isopen && { transform: 'rotate(0deg)' }),
}));

export default {
  Info,
  Details,
  Opener,
};
