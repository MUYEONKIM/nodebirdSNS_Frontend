import { useForm } from 'react-hook-form';
import * as S from '../styles/main.style'
import axios from 'axios';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../src/store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAxios } from '../src/axios';
import { jwtDecode } from 'jwt-decode';

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const api = useAxios();

  const onClickSubmit = async (data) => {
    const result = await axios.post('http://localhost:8001/auth/login', data, { withCredentials: true })
    setToken(token);
    const token = result.data.token
    const tokeninfo = jwtDecode(token)
    const user = {
      id: tokeninfo.id,
      nick: tokeninfo.nick
    }
    console.log(user)
    setUser(user);
  };

  const logintest = async () => {
    const result = await api.get('http://localhost:8001/post/test')
    console.log(result)
  }

  const a = () => {
    console.log(jwtDecode(token))
  }

  const logout = async () => {
    const result = await api.get('/auth/logout')
    localStorage.clear();
    setUser();
    setToken();
    console.log(result)
  }
  return (
    <S.MainWrapper>
      <button onClick={a}>토큰 디코드</button>
      <S.MainContent>
        {user ? `${user.nick}님 환영합니다` :
          <form onSubmit={handleSubmit(onClickSubmit)}>
            이메일 : <input type="text" {...register("email")} /><br />
            비밀번호 : <input type="text" {...register("password")} /><br />
            <button >로그인</button>
            <Link href='http://localhost:8001/auth/kakao'>
              <img src='./kakao_login_medium_narrow.png' />
            </Link>
          </form>
        }
        <button onClick={() => router.push('/board')}>asd</button>
        <button onClick={logout}>로그아웃</button>
      </S.MainContent>

      <button onClick={logintest}> 로그인 테스트 </button>
      <p>
        해야할 것
        1. session로그인 완료 - 설명 붙이기
        2. jwt-login decode랑 다하기 완ㄹ
        3. 로그인 유지 시키기 위해 recoil persist 적용 완료
        4. 로그아웃 기능 (해야할것)
        5. 화면 ui
        6. s3 이용해서 업로드
        7. 배포

        내일 할 것
        포트폴리오에 위 사항들 전부 기입하고, 이력서 또 넣기
      </p>

    </S.MainWrapper>

  )
}



