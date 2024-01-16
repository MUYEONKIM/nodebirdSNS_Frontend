import * as S from '../../styles/board.style'
import { useEffect, useState } from 'react';
import { useAxios } from '../../src/axios';
import { useRouter } from 'next/router';
import { getDate } from '../../src/getDate';
import Paginations from '../../src/pagnation/pagnation.presenter';

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const result = await api.get('/board/posts', {
      })
      setData(result?.data);
    };
    getData()
  }, [])
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = Math.ceil((data?.length ?? 10) / 10);

  const api = useAxios();
  const router = useRouter();

  const onClickRouter = () => (query) => {
    router.push(`/board/${query.target.id}`)
  }

  const onChangeSearch = (data) => {
    setSearch(data.target.value);
  };

  const getSearchData = async (data) => {
    let page = data.page
    console.log(page)
    const result = await api.get('/board/posts',
      {
        params: {
          search,
          page: page
        }
      })
    setData(result?.data);
  };

  const onClickPage = (event) => {
    const activedPage = event.currentTarget.id;
    setActivedPage(activedPage);
    getSearchData({ page: activedPage });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);
    getSearchData({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);
      getSearchData({ page: startPage + 10 });
    }
  };

  return (
    <S.MainWrapper>
      <S.MainContent>
        <S.ContentTop>
          <>
            <input placeholder="검색어를 입력하세요." onChange={onChangeSearch} />
            <S.SearchButton onClick={getSearchData}>검색</S.SearchButton>
          </>
          <S.WriteButton onClick={() => router.push('/board/write')}>글쓰기</S.WriteButton>
        </S.ContentTop>
        <S.TableTop />
        <S.Row>
          <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
          <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
          <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
          <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
        </S.Row>
        {data?.payload.map((el) => (
          <S.Row key={el.id} onClick={onClickRouter(el.id)}>
            <S.ColumnBasic>
              {el.id}
            </S.ColumnBasic>
            <S.ColumnTitle
              id={el.id}
            >
              {el.title}
            </S.ColumnTitle>
            <S.ColumnBasic>{el.User.nick}</S.ColumnBasic>
            <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
          </S.Row>
        ))}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3%" }}>
          <Paginations
            startPage={startPage}
            lastPage={lastPage}
            activedPage={activedPage}
            onClickPage={onClickPage}
            onClickPrevPage={onClickPrevPage}
            onClickNextPage={onClickNextPage} />
        </div>
      </S.MainContent>
    </S.MainWrapper>
  )
}
{/* 
          <S.TableTop />
          <S.Row>
            <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
            <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
            <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
            <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
          </S.Row>
          {data?.fetchBoards.map((el) => (
            <S.Row key={el._id}>
              <S.ColumnBasic>
                {String(el._id).slice(-4).toUpperCase()}
              </S.ColumnBasic>
              <S.ColumnTitle
                id={el._id}
                onClick={onClickMoveToPage(`/boards/${el._id}`)}
              >
                {el.title
                  .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                  .split(SECRET)
                  .map((el) => (
                    <S.TextToken key={uuidv4()} isMatched={keyword === el}>
                      {el}
                    </S.TextToken>
                  ))}
              </S.ColumnTitle>
              <S.ColumnBasic>{el.writer}</S.ColumnBasic>
              <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
            </S.Row>
          ))}
          <S.TableBottom /> */}