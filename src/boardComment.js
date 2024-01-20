import { useState } from "react";
import * as S from "../styles/boardDetail.style";
import { useAxios } from "./axios";
import { useRouter } from "next/router";

export default function BoardComment(props) {
  const api = useAxios();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState();

  const onChangeComment = (data) => {
    setComment(data.target.value)
  }

  const onClickComment = async () => {
    await api.patch(`/post/comment/${props.el.id}`, { comment });
    const result = await api.get(`/board/post/${router.query.id}`);
    props.setContent(result.data.payload)
    setIsEdit((curr) => !curr)
  }

  const onClickDelete = async () => {
    const confirmflag = confirm("정말 삭제하시겠습니까?");

    if (confirmflag) {
      await api.delete(`/post/comment/${props.el.id}`);
      const result = await api.get(`/board/post/${router.query.id}`);
      props.setContent(result.data.payload)
    } else {
      return
    }
  }

  return (
    <>
      <S.CommentWrapper key={props.index}>
        <S.CommentWriter>
          {props.el.UserId}
        </S.CommentWriter>
        <S.CommentContent>
          {props.el.comment}
          <S.CommentAlter>
            <S.CommentAlterBtn onClick={() => setIsEdit((curr) => !curr)}>수정&nbsp;</S.CommentAlterBtn>
            <S.CommentAlterBtn onClick={onClickDelete}> | 삭제</S.CommentAlterBtn>
          </S.CommentAlter>
          {isEdit ?
            <>
              <S.CommentInput placeholder="댓글을 등록해주세요." onChange={onChangeComment} />
              <S.CommentButton onClick={onClickComment}>수정</S.CommentButton>
            </>
            : <></>}
        </S.CommentContent>
      </S.CommentWrapper>
    </>
  )
}

