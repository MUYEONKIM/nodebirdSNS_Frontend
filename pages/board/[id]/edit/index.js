import { useEffect, useState } from "react";
import BoardWrite from "../../../../src/boardWrite";
import { useAxios } from "../../../../src/axios";
import { useRouter } from "next/router";

export default function BoardEditPage() {
  const [data, setData] = useState();

  const api = useAxios();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const result = await api.get(`/board/post/${router.query.id}`);
      setData(result.data.payload)
    };
    getData();
  }, [router.query.id])


  return <BoardWrite isEdit={true} data={data} />
}