import styled from "@emotion/styled";

export const LayoutWrapper = styled.section`
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LayoutHeader = styled.section`
  height: 100px;
  width: 90%;
  font-size: 1.5em;
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

export const LayoutMenu = styled.p`
  color: white;
  border-bottom: 1px solid white;
  cursor: pointer;
`