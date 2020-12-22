// External
import styled from '@emotion/styled/macro';

// Internal
// import {} from '~Styles/abstract/_variables';

export const Controls = styled.div(({ hasQueries }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 10px',
  ...(hasQueries && { no: 'value' }),
}));

export const CenterInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    padding: 2px 5px;
  }
  > div {
    display: inline;
    min-height: 26px;
    button {
      display: flex;
      align-items: center;
      margin: 2px 5px;
      min-width: 75px;
      justify-content: space-evenly;
    }
  }
`;

export default {
  Controls,
  CenterInfo,
};
