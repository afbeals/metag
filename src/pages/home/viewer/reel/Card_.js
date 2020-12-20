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

export const Card = styled.div(({ selected }) => ({
  height: '190px',
  width: '240px',
  margin: '10px 5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  cursor: 'pointer',
  ':hover': {
    border: `1px solid ${secondary}`,
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
  .groupCatWrapper {
    font-size: 0.75em;
    letter-spacing: 0.5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .group {
      max-width: 61px;
      background: ${secondaryDark};
      padding: 2px 5px;
      margin-right: 2px;
      pointer-events: auto;
      .tooltip__children {
        overflow: hidden;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .category {
      background: ${secondaryDark};
      color: ${fontColorPrimary};
      padding: 2px 5px;
      font-style: italic;
      font-weight: 700;
    }
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
  height: 18px !important;
  text-transform: capitalize;
  span {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
`;

export const AltGroups = styled.div`
  margin-left: auto;
  background: ${secondaryDark};
  pointer-events: auto;
  min-height: 12px;
  margin-right: 2px;
  .altWrapper {
    font-size: 0.65em;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    padding: 2px 5px;
    &__ft {
      margin-right: 5px;
    }
    &__content {
      font-style: italic;
      white-space: nowrap;
      max-width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export default {
  AltGroups,
  Card,
  Tags,
  Category,
  InfoLine,
  ImageWrapper,
  Pill,
};
