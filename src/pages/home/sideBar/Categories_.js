// External
import styled from '@emotion/styled/macro';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const List = styled.div`
  height: 90%;
  width: 90%;
  align-self: flex-end;
  border-radius: 5px;
  margin-top: auto;
  margin-bottom: 10px;
  padding: 5px;
  background: #929292;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const ListItem = styled.div(({ selected }) => ({
  display: 'flex',
  'flex-direction': 'row',
  'text-transform': 'capitalize',
  color: 'white',
  cursor: 'pointer',
  margin: '5px 0px',
  padding: '0px 5px',
  width: '98%',
  'align-items': 'center',
  ':hover': {
    background: '#ffffff7a',
    'border-radius': '15px',
  },
  div: {
    outline: 'none',
    'flex-grow': '1',
  },
  ...(selected && { background: '#ffffff7a' }),
}));

export const Editor = styled.div(({ isOpen }) => ({
  position: 'absolute',
  top: '42px',
  right: '0',
  background: 'white',
  height: '95%',
  width: '95%',
  'max-height': '0px',
  display: 'flex',
  overflow: 'hidden',
  'justify-content': 'flex-start',
  transition: 'all 1.5s',
  'z-index': '2',
  padding: '10px 8px',
  'flex-direction': 'column',

  ...(isOpen && { 'max-height': '900px' }),
}));

export default {
  Container,
  Editor,
  List,
};
