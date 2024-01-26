import { tokenState, userState } from "../../src/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";

export default function Kakao() {
  const [user, setUser] = useRecoilState(userState);
  const [, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  useEffect(() => {
    let token = new URL(window.location.href).searchParams.get("token");
    if (!token) {
      alert("잘못된 접근입니다.")
      return router.push('/')
    }
    setToken(token)
    const tokeninfo = jwtDecode(token);
    const user = {
      id: tokeninfo.id,
      nick: tokeninfo.nick
    };
    setUser(user);
    router.push('/profile')
  }, [])

  console.log(user)
  return <>로그인 중입니다..</>
}