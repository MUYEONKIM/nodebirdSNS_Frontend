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
  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const api = useAxios();
  const formData = new FormData();
  const router = useRouter();

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFileList = Array.from(files);
    setFileList(newFileList);

  };

  const onClickSubmit = async (event) => {
    event.preventDefault()
    formData.append('img', fileList[0]);
    const result = await api.post('http://localhost:8001/post/img', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        charset: "utf-8",
      }
    })

    const result2 = await api.post('http://localhost:8001/post',
      {
        title,
        content,
        img: result.data.url,
      })
    console.log(result2)
  };


  const onChangeContent = (data) => {
    setContent(data.target.value)
  }

  const onChangetitle = (data) => {
    setTitle(data.target.value)
  }

  return (
    <S.MainWrapper>
      <S.MainContent>
        <form onSubmit={onClickSubmit}>
          제목 : <input type="text" onChange={onChangetitle} /><br />
          내용 : <input type="text" onChange={onChangeContent} /><br />
          파일 : <input type="file" onChange={handleFileChange} /><br />
          <button>제출</button>
        </form>
      </S.MainContent>
      <button onClick={() => { router.push('/boarddetail') }}>wfqwwqf</button>
    </S.MainWrapper>
  )
}