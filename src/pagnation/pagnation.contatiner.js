import { useState } from "react";
import PaginationsPresenter from "./pagnation.presenter";

export default function Paginations(props) {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);

  const onClickPage = (event) => {
    const activedPage = event.currentTarget.id;
    setActivedPage(activedPage);
    props.getSearchData({ page: activedPage });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);
    props.getSearchData({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);
      props.getSearchData({ page: startPage + 10 });
    }
  };

  return (
    <PaginationsPresenter
      startPage={startPage}
      lastPage={props.lastPage}
      activedPage={activedPage}
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
    />
  );
}