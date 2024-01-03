import { useForm } from 'react-hook-form';
import * as S from '../../styles/main.style'
import axios from 'axios';

export default function Home() {
  const { register, handleSubmit } = useForm();

  const onClickSubmit = async (data) => {
    const result = await axios.post('http://localhost:8001/auth/join', data)
    console.log(result.data)
  };
  return (
    <S.MainWrapper>
      <S.MainContent>
        <form onSubmit={handleSubmit(onClickSubmit)}>
          이메일 : <input type="text" {...register("email")} /><br />
          닉네임 : <input type="text" {...register("nick")} /><br />
          비밀번호 : <input type="text" {...register("password")} /><br />
          <button>회원가입</button>
        </form>
      </S.MainContent>
    </S.MainWrapper>
  )
}

