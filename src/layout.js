import Link from "next/link";
import * as S from "../styles/layout.style";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "./store";
import { useAxios } from "./axios";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [user, setUser] = useRecoilState(userState);
  const [, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  const api = useAxios();

  const logout = async () => {
    const result = await api.get('/auth/logout')
    localStorage.clear();
    setUser();
    setToken();
    alert(result.data)
    router.push('/')
  }

  const login = () => {
    router.push('/')
  }

  return (
    <S.LayoutWrapper>
      <S.LayoutHeader>
        <Link href={'/profile'}>
          <S.LayoutMenu>MYPAGE</S.LayoutMenu>
        </Link>
        <Link href={'/board'}>
          <S.LayoutMenu>BOARD</S.LayoutMenu>
        </Link>
        <Link href={'/join'}>
          <S.LayoutMenu>JOIN</S.LayoutMenu>
        </Link>
        <Link href={'/'}>
          {user ?
            <S.LayoutMenu onClick={logout}>LOGOUT</S.LayoutMenu>
            :
            <S.LayoutMenu onClick={login}>LOGIN</S.LayoutMenu>
          }
        </Link>
      </S.LayoutHeader>
      {children}
    </S.LayoutWrapper>
  )
}