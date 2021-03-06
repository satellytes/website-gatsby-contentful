import styled from 'styled-components';

const Separator = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;

  width: 64px;
  background-color: ${ ({theme}) => theme.colors.dark};
  height:1px;
  border: none;
`;

export default Separator;