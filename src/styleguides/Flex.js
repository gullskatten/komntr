import styled, { css } from 'styled-components';

const Flex = styled.div`
  display: ${props => (props.display ? props.display : 'flex')};
  justify-content: ${props => (props.justify ? props.justify : 'unset')};
  align-items: ${props => (props.alignItems ? props.alignItems : 'unset')};
  flex-direction: ${props => (props.direction ? props.direction : 'row')};

  ${props =>
    props.basis &&
    css`
      flex-basis: ${props.basis};
    `};

  ${props =>
    props.flexFlow &&
    css`
      flex-flow: ${props.flexFlow};
    `};

  ${props =>
    props.child &&
    css`
      padding: 0 ${props.gap || '1rem'};

      > * {
        margin: 0 -${props.gap || '1rem'};
      }
    `};
    ${props =>
      props.growToBottom &&
      css`
        flex: 1;
      `}; 
`;

export default Flex;
