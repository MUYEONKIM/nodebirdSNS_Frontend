import { useForm } from 'react-hook-form';
import * as S from '../styles/main.style'
import axios from 'axios';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../src/store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAxios } from '../src/axios';

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const api = useAxios();

  const onClickSubmit = async (data) => {
    const result = await axios.post('http://localhost:8001/auth/login', data, { withCredentials: true })
    setUser(result.data.user);
    setToken(result.data.token);
  };

  const logintest = async () => {
    const result = await api.get('http://localhost:8001/post/test')
    console.log(result)
  }

  return (
    <S.MainWrapper>
      <S.MainContent>
        {user ? `${user}님 환영합니다` :
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
      </S.MainContent>

      <button onClick={logintest}> 로그인 테스트 </button>
    </S.MainWrapper>
  )
}



