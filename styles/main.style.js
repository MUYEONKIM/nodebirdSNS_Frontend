import styled from "@emotion/styled";

export const MainWrapper = styled.section`
  display: flex;
  height: calc( 100vh - 100px );
  align-items: center;
`

export const MainContent = styled.section`
  border: 1px solid white;
  border-radius: 15px;
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 500px;
  width: 400px;
`

export const JoinContent = styled.section`
  border-radius: 15px;
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 600px;
  width: 400px;
  border: 1px solid white;
`

export const MainForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Contentarticle = styled.article`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ContentInput = styled.input`
  margin-top: 10px;
  height: 30px;
`

export const LoginButton = styled.button`
  padding: 10px;
  border: 1px solid;
  border-radius: 15px;
  background-color: white;
`

export const title = styled.p`
  font-size: 2em;
  color: white;
`

export const logoutButton = styled.button`
  padding: 10px;
  border: 1px solid;
  border-radius: 15px;
  background-color: white;
`

