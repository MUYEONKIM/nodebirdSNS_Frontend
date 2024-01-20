import { useEffect, useState } from 'react';
import { userState } from '../../src/store';
import * as S from '../../styles/mypage.style'
import { useRecoilState } from 'recoil';
import { useAxios } from '../../src/axios';
import { getDate } from '../../src/getDate';

export default function Mypage() {
  const [content, setContent] = useState();
  const [user, setUser] = useRecoilState(userState);

  const api = useAxios();

  const getData = async () => {
    const result = await api.get(`/board/posts/${user.id}`);
    setContent(result.data.payload)
  };

  console.log(user)

  return (
    <S.ContentWrapper>
      <button onClick={getData}>dsa</button>
      <S.userTitle>{user?.nick}님 환영합니다</S.userTitle>
      <S.userTitle>
        My Post
        <S.userContent>
          {content?.map((el) => (
            <div key={el.id}>
              {el.id}
              {/* <div>{el.title}</div> */}
              {/* <div>{el.content}</div> */}
              {/* <div>{getDate(el.createdAt)}</div> */}
            </div>
          ))}
        </S.userContent>
      </S.userTitle>
      <S.userTitle>
        Follow
        <S.userContent>
        </S.userContent>
      </S.userTitle>
      <S.userTitle>
        Dev..ing
        <S.userContent>
        </S.userContent>
      </S.userTitle>
    </S.ContentWrapper>
  )
}