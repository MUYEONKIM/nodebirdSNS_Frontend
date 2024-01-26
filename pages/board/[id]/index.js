import { useAxios } from "../../../src/axios"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "../../../styles/boardDetail.style";
import { getDate } from "../../../src/getDate";
import BoardComment from "../../../src/boardComment";
import DOMPurify from "dompurify";

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

  const onClickComment = async () => {
    await api.post('/post/comment', { comment, PostId: content.id });
    const result = await api.get(`/board/post/${router.query.id}`);
    setContent(result.data.payload);
    setComment();
  }

  const onClickDelete = async () => {
    const confirmflag = confirm("정말 삭제하시겠습니까?");

    if (confirmflag) {
      try {
        const result = await api.delete(`/board/post/${router.query.id}`);
        console.log(result)
        router.push("/board")
      } catch (error) {
        alert(error.response.data.message)
        return
      }
    } else {
      return
    }
  }
  return (
    <S.MainWrapper>
      <S.MainContent>
        <S.ContentTop>
          <h2>{content?.title}</h2>
          {getDate(content?.createdAt)}
        </S.ContentTop>
        <S.TableTop />
        <S.AlertSection>
          <S.AlertButton onClick={() => router.push(`${router.asPath}/edit`)}>수정&nbsp;</S.AlertButton>
          <S.AlertButton onClick={onClickDelete}>/ 삭제</S.AlertButton>
        </S.AlertSection>
        <S.ContentMiddle>
          {typeof window !== "undefined" && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  content?.content ?? "",
                ),
              }}
            />
          )}
          {content?.img ?
            <S.ContentImg src={`http://localhost:8001${content?.img}`} /> : <></>}
        </S.ContentMiddle>
        <S.TableBotton />
        <S.CommentInput onChange={onChangeComment} placeholder="댓글을 등록해주세요." />
        <S.CommentButton onClick={onClickComment}>등록</S.CommentButton>
        {content?.Comments.map((el, index) => (
          <BoardComment el={el} index={index} setContent={setContent} />
        ))}
      </S.MainContent>
    </S.MainWrapper>
  )
}