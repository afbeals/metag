// External
import styled from '@emotion/styled/macro';
import Button from '@material-ui/core/Button';

// Internal
import { animSpeed } from '~Styles/abstract/_variables';

export const Player = styled.div(({ hasMovie }) => ({
  height: '100%',
  padding: '50px 100px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  transition: `all ${animSpeed}s`,
  width: '0',
  position: 'relative',
  ...(hasMovie && { width: '100%' }),
}));

export const VideoWrapper = styled.div`
  width: 100%;
  border: 20px solid #000000;
  border-radius: 15px;
`;

export const CloseButton = styled(Button)`
  position: absolute !important;
  right: 15px;
  font-size: 0.75em;
  top: 15px;
`;

export default {
  CloseButton,
  Player,
  VideoWrapper,
};
