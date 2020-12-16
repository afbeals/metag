// External
import styled from '@emotion/styled/macro';

// Internal
import {
  animSpeed,
  primaryLight,
  fontColorSecondary,
  black,
} from '~Styles/abstract/_variables';

export const SideBar = styled.div(() => ({
  'flex-grow': '1',
  'font-size': '1rem',
  'box-shadow': `2px 0px 11px 1px ${black}`,
  display: 'flex',
  'flex-direction': 'row',
  'align-items': 'center',
  background: '#ebebeb',
  width: 'fit-content',
}));

export const SelectorIcon = styled.div(({ selected }) => ({
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
  'justify-content': 'center',
  'text-transform': 'capitalize',
  width: '100%',
  padding: '5px 10px',
  cursor: 'pointer',
  outline: 'none',
  transition: `all ${animSpeed}s`,
  p: {
    'font-size': '.75em',
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
  'font-size': '1em',
  height: '100%',
  display: 'flex',
  'flex-direction': 'column',
  background: primaryLight,
  width: 'fit-content',
}));

export const SelectorBottom = styled.div(() => ({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center',
  opacity: '1',
  '.hide': {
    'pointer-events': 'none',
    opacity: '0',
  },
}));

export const SelectorMain = styled.div(() => ({
  'flex-grow': '1',
  display: 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
  'justify-content': 'center',
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
