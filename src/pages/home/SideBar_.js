// External
import styled from '@emotion/styled/macro';

// Internal
import {
  animSpeed,
  primaryLight,
  fontColorSecondary,
  colorBlack,
} from '~Styles/abstract/_variables';

export const SideBar = styled.div(() => ({
  flexGrow: '1',
  fontSize: '1rem',
  bowShadow: `2px 0px 11px 1px ${colorBlack}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  background: '#ebebeb',
  width: 'fit-content',
}));

export const SelectorIcon = styled.div(({ selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'capitalize',
  width: '100%',
  padding: '5px 10px',
  cursor: 'pointer',
  outline: 'none',
  transition: `all ${animSpeed}s`,
  p: {
    fontSize: '.75em',
    ...(selected && { color: fontColorSecondary }),
  },
  ':hover': {
    background: '#101f27',
  },
  ...(selected && {
    background: '#ebebeb',
  }),
}));

export const Selector = styled.div(() => ({
  fontSize: '1em',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: primaryLight,
  width: 'fit-content',
}));

export const SelectorBottom = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: '1',
  '.hide': {
    pointerEvents: 'none',
    opacity: '0',
  },
}));

export const SelectorMain = styled.div(() => ({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const List = styled.div(({ isOpen }) => ({
  transition: `all ${animSpeed}s`,
  color: fontColorSecondary,
  width: '0px',
  height: '100%',
  position: 'relative',
  '.trans': {
    height: '100%',
  },
  ...(isOpen && {
    width: '225px',
  }),
}));

export default {
  List,
  SideBar,
  Selector,
  SelectorIcon,
  SelectorBottom,
  SelectorMain,
};
