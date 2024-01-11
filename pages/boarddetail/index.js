import { useRecoilState } from "recoil";
import { useAxios } from "../../src/axios"
import { userState } from "../../src/store";
import { useState } from "react";

export default function BoardDetail() {
  const [user] = useRecoilState(userState);
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState();
  const [comment, setComment] = useState();

  const api = useAxios();

  const onClickButton = async () => {
    const result = await api.get('v2/posts/my');

    console.log(result.data.payload)
    setContents(result.data.payload)
  }

  const onClickButton2 = async () => {
    const result = await api.post('/v2/posts', { search });
    setContents(result.data.payload)
    console.log(result)
  }

  const onChangeSearch = (data) => {
    setSearch(data.target.value)
  }

  const onChangeComment = (data) => {
    setComment(data.target.value)
  }

  const onClickButton3 = (data) => async () => {
    const result = await api.post(`/user/${data}/follow`);
    console.log(data)
  }

  const onClickComment = (PostId) => async () => {
    const result = await api.post('/post/comment', { comment, PostId });
    console.log(result)
  }

  return (
    <>
      <button onClick={onClickButton}>게시글 목록리스트</button>
      <button onClick={onClickButton2}>asdwdw asd</button>
      <input onChange={onChangeSearch} />
      {contents.map((el) => (
        <div style={{ border: "1px solid" }} key={el.id}>
          <div>{el.content}</div>
          <img src={`http://localhost:8001${el.img}`} />
          <div>좋아요 : </div>
          <button onClick={onClickButton3(el.UserId)}>팔로우 버튼</button>
          <div>댓글창
            <input onChange={onChangeComment} />
            <button onClick={onClickComment(el.id)}>댓글 등록하기</button>
          </div>
        </div>
      ))}
    </>
  )
}