import styled from "@emotion/styled";

export const MainWrapper = styled.section`
  display: flex;
  /* height: calc( 100vh - 100px ); */
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
  margin-top: 50px;
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

export const TableLine = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Mybutton = styled.button`
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid gray;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin-left: 10px;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

:hover,
:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

:hover {
  transform: translateY(-1px);
}

:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
`