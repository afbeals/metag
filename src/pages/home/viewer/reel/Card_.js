// External
import styled from '@emotion/styled/macro';
import Chip from '@material-ui/core/Chip';

// Internal
import {
  secondary,
  secondaryDark,
  fontColorPrimary,
  fontColorSecondary,
  white,
} from '~Styles/abstract/_variables';

export const Container = styled.div(({ selected }) => ({
  height: '175px',
  width: '225px',
  margin: '10px 5px',
  display: 'flex',
  'flex-direction': 'column',
  overflow: 'hidden',
  'align-items': 'flex-start',
  'justify-content': 'flex-start',
  cursor: 'pointer',
  ':hover': {
    border: `1px solid ${secondary}`,
  },
  '*': {
    'pointer-events': 'none',
  },
  ...(selected && { border: '2px solid #8d2626', 'border-radius': '2px' }),
}));

export const ImageWrapper = styled.div`
  width: 100%;
  height: 72%;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
  .duration {
    position: absolute;
    right: 2px;
    bottom: 2px;
    font-size: 0.7em;
    font-style: italic;
    background: #0000004a;
    padding: 2px 5px;
  }
`;

export const InfoLine = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px 2px;
  text-transform: capitalize;
  .category {
    background: ${secondaryDark};
    color: ${fontColorPrimary};
    font-size: 0.75em;
    padding: 2px 5px;
    font-style: italic;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
`;

export const Category = styled.div``;

export const Tags = styled.div`
  margin-top: auto;
  .pill {
    font-size: 0.65em;
    background: ${white};
    color: ${fontColorSecondary};
    padding: 2px 4px;
    text-transform: capitalize;
    border-radius: 5px;
    margin: 2px 4px;
  }
`;

export const Pill = styled(Chip)`
  font-size: 0.6em !important;
  text-transform: capitalize;
`;

export default {
  Container,
  Tags,
  Category,
  InfoLine,
  ImageWrapper,
  Pill,
};
