// External
import styled from '@emotion/styled/macro';

export const Reel = styled.div(({ movieSelected }) => ({
  height: '100vh',
  overflowY: 'scroll',
  overflowx: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  ...(movieSelected && {
    width: '25%',
  }),
}));

export default {
  Reel,
};
