import axios from "axios";
import { useEffect, useState } from "react"

export default function Kakao() {
  const [code, setCode] = useState();

  useEffect(async () => {
    const result = await axios.get('http://localhost8001:/kakao/callback')
    setCode(result)
  }, [])

  console.log(code)
  return <>로그인 중입니다..</>
}