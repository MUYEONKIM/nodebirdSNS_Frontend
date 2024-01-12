import { useForm } from 'react-hook-form';
import * as S from '../styles/main.style'
import axios from 'axios';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../src/store';
import { useAxios } from '../src/axios';
import { jwtDecode } from 'jwt-decode';

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [, setToken] = useRecoilState(tokenState);
  const { register, handleSubmit } = useForm();
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

    } catch (error) {
      alert(error.response.data)
    }
  };

  const logout = async () => {
    const result = await api.get('/auth/logout')
    localStorage.clear();
    setUser();
    setToken();
    console.log(result)
  }

  // payload의 comments 배열에 담김
  // const qwe = async () => {
  //   const result = await api.post('/v2/post', { contentId: 3 })
  //   console.log(result)
  // }
  return (
    <S.MainWrapper>
      <S.MainContent>
        {/* <button onClick={qwe}>efw</button> */}
        {user ? (
          <S.userContent>
            <S.userTitle>{user.nick}님 환영합니다</S.userTitle>
            <S.logoutButton onClick={logout}>로그아웃</S.logoutButton>
          </S.userContent>
        ) :
          <S.MainForm onSubmit={handleSubmit(onClickSubmit)}>
            <S.title>LOGIN</S.title>
            <S.Contentarticle>EMAIL<S.ContentInput type="text" {...register("email")} /></S.Contentarticle>
            <S.Contentarticle>PASSWORD <S.ContentInput type="password" {...register("password")} /></S.Contentarticle>
            <S.LoginButton>SIGNIN</S.LoginButton>
            <Link href='http://localhost:8001/auth/kakao'>
              <img src='./kakao_login_medium_narrow.png' width={"200px"} height={"50px"} />
            </Link>
          </S.MainForm>
        }
      </S.MainContent>
    </S.MainWrapper>

  )
}



