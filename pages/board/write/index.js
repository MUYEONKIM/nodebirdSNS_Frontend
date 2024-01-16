import 'react-quill/dist/quill.snow.css';
import * as S from '../../../styles/boardWrite.style'
import { useState } from 'react';
import { useAxios } from '../../../src/axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

export default function Home() {
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState();
  const api = useAxios();
  const formData = new FormData();
  const router = useRouter();

  const ReactQuill = dynamic(async () => await import("react-quill"), {
    ssr: false
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFileList = Array.from(files);
    setFileList(newFileList);
  };

  const onClickSubmit = async (event) => {
    formData.append('img', fileList[0]);
    try {
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
    } catch (error) {
      console.error(error.message)
    }
  };


  const onChangeContent = (data) => {
    console.log(data)
  }

  const onChangetitle = (data) => {
    setTitle(data.target.value)
  }
  console.log(content)
  return (
    <S.MainWrapper>
      <S.MainContent>
        <form onSubmit={onClickSubmit}>
          <S.title type="text" onChange={onChangetitle} placeholder='제목을 입력하세요' /><br />
          <ReactQuill
            style={{
              width: "100%",
              height: "480px",
              marginBottom: "60px",
            }}
            onChange={onChangeContent}
          />
          파일 : <input type="file" onChange={handleFileChange} /><br />
          <button>제출</button>
        </form>
      </S.MainContent>
    </S.MainWrapper>

  )
}
{/* 
          <S.TableTop />
          <S.Row>
            <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
            <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
            <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
            <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
          </S.Row>
          {data?.fetchBoards.map((el) => (
            <S.Row key={el._id}>
              <S.ColumnBasic>
                {String(el._id).slice(-4).toUpperCase()}
              </S.ColumnBasic>
              <S.ColumnTitle
                id={el._id}
                onClick={onClickMoveToPage(`/boards/${el._id}`)}
              >
                {el.title
                  .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                  .split(SECRET)
                  .map((el) => (
                    <S.TextToken key={uuidv4()} isMatched={keyword === el}>
                      {el}
                    </S.TextToken>
                  ))}
              </S.ColumnTitle>
              <S.ColumnBasic>{el.writer}</S.ColumnBasic>
              <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
            </S.Row>
          ))}
          <S.TableBottom /> */}