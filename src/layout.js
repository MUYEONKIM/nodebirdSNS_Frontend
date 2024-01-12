import Link from "next/link";
import * as S from "../styles/layout.style";

export default function Layout({ children }) {
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
          <S.LayoutMenu>LOGIN</S.LayoutMenu>
        </Link>
      </S.LayoutHeader>
      {children}
    </S.LayoutWrapper>
  )
}