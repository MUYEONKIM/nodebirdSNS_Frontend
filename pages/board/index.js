import * as S from '../../styles/main.style'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../../src/store';
import { useState } from 'react';

export default function Home() {
  // const [user, setUser] = useRecoilState(userState)
  const [fileList, setFileList] = useState([]);
  const [user,] = useRecoilState(userState);
  const [token] = useRecoilState(tokenState);
  const [content, setContent] = useState();
  const formData = new FormData();

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
    const result = await axios.post('http://localhost:8001/post/img', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        charset: "utf-8",
        authorization: token
      }
    })
    const result2 = await axios.post('http://localhost:8001/post', { data: "qq", qq: "weq" })
    console.log(result2)
  };

  const onChangeContent = (data) => {
    setContent(data)
  }

  return (
    <S.MainWrapper>
      <S.MainContent>
        <form onSubmit={onClickSubmit}>
          {/* 내용 : <input type="text" onChange={onChangeContent} /><br /> */}
          파일 : <input type="file" onChange={handleFileChange} /><br />
          <button>제출</button>
        </form>
      </S.MainContent>
    </S.MainWrapper>
  )
}