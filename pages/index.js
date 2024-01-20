import { useForm } from 'react-hook-form';
import * as S from '../styles/main.style'
import axios from 'axios';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../src/store';
import { useAxios } from '../src/axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (user) router.push('/profile')
  })

  const [user, setUser] = useRecoilState(userState);
  const [, setToken] = useRecoilState(tokenState);
  const { register, handleSubmit } = useForm();

  const router = useRouter();
  const api = useAxios();

  const onClickSubmit = async (data) => {
    try {
      const result = await axios.post('http://localhost:8001/auth/login', data, { withCredentials: true })
      setToken(token);
      const token = result.data.token
      const tokeninfo = jwtDecode(token)
      const user = {
        id: tokeninfo.id,
        nick: tokeninfo.nick
      }
      alert('로그인 성공하였습니다.')
      setUser(user);
      router.push('/profile')
    } catch (error) {
      alert(error.response.data)
    }
  };

  // 내가 쓴 게시물
  // 찜한 게시물

  return (
    <S.MainWrapper>
      <S.MainContent>
        <S.MainForm onSubmit={handleSubmit(onClickSubmit)}>
          <S.title>LOGIN</S.title>
          <S.Contentarticle>EMAIL<S.ContentInput type="text" {...register("email")} /></S.Contentarticle>
          <S.Contentarticle>PASSWORD <S.ContentInput type="password" {...register("password")} /></S.Contentarticle>
          <S.LoginButton>SIGNIN</S.LoginButton>
          <Link href='http://localhost:8001/auth/kakao'>
            <img src='./kakao_login_medium_narrow.png' width={"200px"} height={"50px"} />
          </Link>
        </S.MainForm>
      </S.MainContent>
    </S.MainWrapper>
  )
}



