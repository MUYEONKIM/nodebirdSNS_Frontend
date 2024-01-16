import { useAxios } from "../../../src/axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "../../../styles/boardDetail.style";
import { getDate } from "../../../src/getDate";

export default function BoardDetail() {
  const router = useRouter();
  const [comment, setComment] = useState();
  const [content, setContent] = useState();
  useEffect(() => {
    const getData = async () => {
      const result = await api.get(`/board/post/${router.query.id}`);
      setContent(result.data.payload)
    };
    getData();
  }, [router.query.id])

  const api = useAxios();

  const onChangeComment = (data) => {
    setComment(data.target.value)
  }

  const onClickFollow = (data) => async () => {
    const result = await api.post(`/user/${data}/follow`);
    console.log(data)
  }

  const onClickComment = async () => {
    await api.post('/post/comment', { comment, PostId: content.id });
    const result = await api.get(`/board/post/${router.query.id}`);
    setContent(result.data.payload)
  }

  return (
    <S.MainWrapper>
      <S.MainContent>
        <S.ContentTop>
          <h2>{content?.title}</h2>
          {getDate(content?.createdAt)}
        </S.ContentTop>
        <S.TableTop />
        <S.ContentMiddle>
          <p>
            {content?.content}
          </p>
          <S.ContentImg src={`http://localhost:8001${content?.img}`} />
        </S.ContentMiddle>
        <S.TableBotton />
        <S.CommentInput onChange={onChangeComment} placeholder="댓글을 등록해주세요." /><S.CommentButton onClick={onClickComment}>등록</S.CommentButton>
        {content?.Comments.map((el, index) => (
          <S.CommentWrapper key={index}>
            <S.CommentWriter>
              {el.UserId}
            </S.CommentWriter>
            <S.CommentContent>
              {el.comment}
            </S.CommentContent>
          </S.CommentWrapper>
        ))}
      </S.MainContent>
      {/* <button onClick={onClickButton}>게시글 목록리스트</button>
      <button onClick={onClickButton2}>asdwdw asd</button>
      <input onChange={onChangeSearch} /> */}
      {/* {contents.map((el) => (
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
      ))} */}
    </S.MainWrapper>
  )
}