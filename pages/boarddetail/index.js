import { useRecoilState } from "recoil";
import { useAxios } from "../../src/axios"
import { tokenState } from "../../src/store";
import { useState } from "react";

export default function BoardDetail() {
  const [token] = useRecoilState(tokenState);
  const [contents, setContents] = useState([]);

  const api = useAxios();

  console.log(token)
  const onClickButton = async () => {
    const result = await api.get('v2/posts/my');

    console.log(result.data.payload)
    setContents(result.data.payload)
  }

  const onClickButton2 = async () => {
    const result = await api.get('/post/test');

    console.log(result)
  }
  return (
    <>
      <button onClick={onClickButton}>게시글 목록리스트</button>
      <button onClick={onClickButton2}>asdwdw asd</button>
      {contents.map((el) => (
        <div key={el.id}>
          <div>{el.content}</div>
          <img src={`http://localhost:8001${el.img}`} />
        </div>
      ))}
    </>
  )
}