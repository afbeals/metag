// External
import styled from '@emotion/styled/macro';

export const Reel = styled.div(({ movieSelected }) => ({
  height: '100vh',
  'overflow-y': 'scroll',
  'overflow-x': 'hidden',
  display: 'flex',
  'flex-direction': 'row',
  'justify-content': 'flex-start',
  'align-items': 'flex-start',
  'flex-wrap': 'wrap',
  ...(movieSelected && {
    width: '25%',
  }),
}));

export default {
  Reel,
};
