import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Notfound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  & > * {
    margin: 10px 0;
  }
  color: white;
`;

const CustomLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: white; /* 텍스트 색상 */
  font-weight: bold; /* 굵은 글꼴 */
  margin-top: 10px; /* 링크 위 간격 */
  font-size: 20px;
`;

const NotFound = () => {
  return (
    <Notfound>
      <h1>Oops!</h1>
      <p>예상치 못한 에러가 발생했습니다 ; `^'</p>
      <p style={{ fontStyle: 'italic' }}>Not found</p>
      <CustomLink to="/">돌아가기</CustomLink>
    </Notfound>
  );
};

export default NotFound;
