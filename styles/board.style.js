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

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;

  :hover {
    color: blue;
  }
`;

export const ColumnHeaderBasic = styled.div`
  width: 15%;
  text-align: center;
`;

export const ColumnHeaderTitle = styled.div`
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

export const ContentTop = styled.section`
  width: 100%;
  display: flex;
`

export const SearchButton = styled.button`
  margin-left: 2px;
`

export const WriteButton = styled.button`
  margin-left: auto;
  width: 10%;
`