import 'react-quill/dist/quill.snow.css';
import * as S from '../../styles/boardWrite.style'
import { useRef, useState } from 'react';
import { useAxios } from '../axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false
});

export default function BoardWrite(props) {
  const inputRef = useRef(null);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: props.data
  });

  const [fileList, setFileList] = useState([]);
  const [imageURL, setImageURL] = useState();

  const api = useAxios();
  const formData = new FormData();
  const router = useRouter();


  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFileList = Array.from(files);
    setFileList(newFileList);
  };

  const onClickSubmit = async (data) => {
    formData.append('img', fileList[0]);
    try {
      const result = await api.post('http://localhost:8001/post/img', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          charset: "utf-8",
        }
      })
      setImageURL(result.data.url)
      const result2 = await api.post('http://localhost:8001/post',
        {
          title: data.title,
          content: data.contents,
          img: result.data.url,
        })
      console.log(result2)
    } catch (error) {
      console.error(error.message)
    }
  };


  const onChangeContent = (data) => {
    setValue("contents", data === "<p><br></p>" ? "" : data)
  }

  const onClickInput = () => {
    inputRef.current.click()
  }

  const onClickUpdate = async (data) => {
    if (!data.title) {
      data.title = props.data.title
    }
    await api.patch(`/board/post/${router.query.id}`, {
      title: data.title,
      content: data.contents,
      img: imageURL
    })
    router.push(`/board/${router.query.id}`)
  }
  return (
    <S.MainWrapper>
      <S.MainContent>
        <form onSubmit={
          props.isEdit
            ? handleSubmit(onClickUpdate)
            : handleSubmit(onClickSubmit)}
        >
          {/* <form onClick={handleSubmit((data) => console.log(data))}> */}
          <S.title type="text" {...register("title")} placeholder='제목을 입력하세요' defaultValue={props.data?.title} /><br />
          <S.TableLine />
          <ReactQuill
            style={{
              width: "100%",
              height: "480px",
              marginBottom: "60px",
            }}
            onChange={onChangeContent}
            value={props.data?.content}
          />
          <img style={{ backgroundColor: "Gray", border: "1px solid" }} width="50px" height="50px" src="/camera.png" onClick={onClickInput} />
          <input type="file" onChange={handleFileChange} ref={inputRef} style={{ display: 'none' }} /><br />
          <S.TableLine />
          <S.ButtonSection>
            <S.Mybutton>{props.isEdit ? '수정' : '작성'}</S.Mybutton>
          </S.ButtonSection>
        </form>
      </S.MainContent>
    </S.MainWrapper>

  )
}
