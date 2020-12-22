// External
import styled from '@emotion/styled/macro';

export const Reel = styled.div(({ movieSelected }) => ({
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  ...(movieSelected && {
    width: '25%',
  }),
}));

export const CardWrapper = styled.div(() => ({
  height: '100%',
  overflowY: 'scroll',
  overflowx: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
}));

export default {
  Reel,
  CardWrapper,
};
