import * as S from '../../styles/main.style'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../../src/store';
import { useState } from 'react';
import { useAxios } from '../../src/axios';
import { useRouter } from 'next/router';

export default function Home() {
  // const [user, setUser] = useRecoilState(userState)
  const [fileList, setFileList] = useState([]);
  const [user,] = useRecoilState(userState);
  const [token] = useRecoilState(tokenState);
  const [content, setContent] = useState();
  const api = useAxios();
  const formData = new FormData();
  const router = useRouter();

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFileList = Array.from(files);
    setFileList(newFileList);

  };

  const onClickSubmit = async (event) => {
    // formData.append('UserId', user.userid);
    // formData.append('content', content);
    event.preventDefault()
    formData.append('img', fileList[0]);
    const result = await api.post('http://localhost:8001/post/img', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        charset: "utf-8",
      }
    })
    // console.log(result.data.url, content)

    const result2 = await api.post('http://localhost:8001/post',
      {
        img: result.data.url,
        content,
      })
    console.log(result2)
  };


  const onChangeContent = (data) => {
    setContent(data.target.value)
  }

  return (
    <S.MainWrapper>
      <S.MainContent>
        <form onSubmit={onClickSubmit}>
          내용 : <input type="text" onChange={onChangeContent} /><br />
          파일 : <input type="file" onChange={handleFileChange} /><br />
          <button>제출</button>
        </form>
      </S.MainContent>
      <button onClick={() => { router.push('/boarddetail') }}>wfqwwqf</button>
    </S.MainWrapper>
  )
}