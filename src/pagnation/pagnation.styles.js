import styled from "@emotion/styled";

export const Column = styled.span`
  margin: 0px 50px;
`;


export const Page = styled.span`
  margin: 0px 10px;
  color: ${(props) => (props.isActive ? "blue" : "black")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  cursor: ${(props) => (props.isActive ? "none" : "pointer")};
`;