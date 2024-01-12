import { useForm } from 'react-hook-form';
import * as S from '../../styles/main.style'
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onClickSubmit = async (data) => {
    if (data.password !== data.confirm) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    const newdata = { ...data }
    delete newdata.confirm
    const result = await axios.post('http://localhost:8001/auth/join', data)
    console.log(result)
    alert(result.data)
    router.push('/')
  };
  return (
    <S.MainWrapper>
      <S.JoinContent>
        <S.MainForm onSubmit={handleSubmit(onClickSubmit)}>
          <S.title>JOIN</S.title>
          <S.Contentarticle>EMAIL<S.ContentInput type="text" required={true} {...register("email")} /></S.Contentarticle>
          <S.Contentarticle>NICK<S.ContentInput type="text" required={true} {...register("nick")} /></S.Contentarticle>
          <S.Contentarticle>PASSWORD<S.ContentInput type="password" required={true} {...register("password")} /></S.Contentarticle>
          <S.Contentarticle>CONFIRM<S.ContentInput type="password" {...register("confirm")} /></S.Contentarticle>
          <S.LoginButton>SIGN UP</S.LoginButton>
        </S.MainForm>
      </S.JoinContent>
    </S.MainWrapper>
  )
}

