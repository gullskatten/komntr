import React from 'react';
import styled from 'styled-components';

const NoContentWrapper = styled.div`
  display: flex;
  border-left: 5px solid #624694;
  min-height: 35px;
  align-items: center;
`;
const NoContentText = styled.span`
  margin-left: 15px;
  color: #777;
`;

const NoContentFound = ({ label }) => {
  return (
    <NoContentWrapper>
      <NoContentText>{label || 'Nothing to show here..'}</NoContentText>
    </NoContentWrapper>
  );
};
export default NoContentFound;
