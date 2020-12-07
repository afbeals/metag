// External
import styled from '@emotion/styled/macro';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UserImg = styled.div``;

export const UserInfo = styled.div``;

export const InfoLine = styled.h5`
  display: flex;
  flex-direction: row;
  margin: 5px 0px;
  span {
    text-transform: capitalize;
    font-weight: 700;
    margin-right: auto;
  }
`;

export default {
  Container,
  UserImg,
  UserInfo,
  InfoLine,
};
