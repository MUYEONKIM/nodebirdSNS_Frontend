import styled from "@emotion/styled";

export const MainWrapper = styled.section`
  display: flex;
  height: calc( 100vh - 100px );
  align-items: center;
`

export const MainContent = styled.section`
  border: 1px solid white;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 800px;
`

export const title = styled.textarea`
  border-top: 2px solid gray;
  margin-top: 20px;
  resize: none;
  font-size: 32px;
  font-weight: bold;
  font-family: Impact;
  width: 100%;
  border: none;
`;

export const WriteButton = styled.button`
  margin-left: auto;
  width: 10%;
`