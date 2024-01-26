import { useEffect, useState } from 'react';
import { userState } from '../../src/store';
import * as S from '../../styles/mypage.style'
import { useRecoilState } from 'recoil';
import { useAxios } from '../../src/axios';
import { getDate } from '../../src/getDate';
import { useRouter } from 'next/router';
import Paginations from '../../src/pagnation/pagnation.contatiner';

export default function Mypage() {
  useEffect(() => {
    const getData = async () => {
      const result = await api.get(`/board/posts/${user.id}`);
      setContent(result?.data)
    };
    getData()
  }, [])
  const [content, setContent] = useState();
  const lastPage = Math.ceil((content?.length ?? 10) / 10);
  const [user] = useRecoilState(userState);
  const router = useRouter();
  const api = useAxios();

  const getData = async (data) => {
    let page = data.page
    const result = await api.get(`/board/posts/${user.id}`,
      {
        params: {
          page: page
        }
      });
    setContent(result.data)
  };

  const onClickRouter = () => (data) => {
    router.push(`/board/${data.currentTarget.id}`)
  }

  return (
    <S.ContentWrapper>
      <S.userTitle>{user?.nick}님 환영합니다</S.userTitle>
      <S.userTitle>
        My Post
      </S.userTitle>
      <S.TableTop />
      <S.userContent>
        {/* <S.TableTop /> */}
        <S.Row>
          <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
          <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
          <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
        </S.Row>
        {content?.payload.map((el) => (
          <S.Row key={el.id} id={el.id} onClick={onClickRouter(el.id)}>
            <S.ColumnBasic>
              {el.id}
            </S.ColumnBasic>
            <S.ColumnTitle >
              {el.title}
            </S.ColumnTitle>
            <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
          </S.Row>
        ))}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3%", fontSize: "16px" }}>
          <Paginations
            lastPage={lastPage}
            getSearchData={getData}
          />
        </div>
      </S.userContent>
      <S.userTitle>
        Dev..ing
        <S.TableTop />
        <S.userContent>
        </S.userContent>
      </S.userTitle>
    </S.ContentWrapper>
  )
}