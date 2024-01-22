import styled from "@emotion/styled"

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc( 100vh - 100px );
  padding: 5%;
  width: 60%;
  `
export const userContent = styled.section`
  color: black;
  border-radius: 15px;
  background-color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 5%;
  `

export const userTitle = styled.h2`
  margin-top: 20px;
  color: white;
`

export const TableTop = styled.div`
  border-top: 2px solid white;
  margin-top: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  font-size: 18px;
`;

export const ColumnHeaderBasic = styled.div`
font-weight: bolder;
  width: 15%;
  text-align: center;
`;

export const ColumnHeaderTitle = styled.div`
font-weight: bolder;
  width: 55%;
  text-align: center;
`;

export const ColumnBasic = styled.div`
  width: 15%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ColumnTitle = styled.div`
  width: 55%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: blue;
  }
`;