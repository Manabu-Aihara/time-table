import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuthQuery } from "../../resources/queries";
import { fetchGetId } from "../../hooks/useFetch";

export const AuthLeavePage = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  // const [value, setValue] = useState<number>(0);
  const { data, isError, isLoading } = useAuthQuery();
  const navigate = useNavigate();

  console.log(`とりあえず結果のID: ${data}`);
  console.log(`とりあえず結果のerr: ${isError}`);
  // setValue(data!);
  navigate(`/calendar?userID=${data}`);
  // useEffect(() => {
  //   const f = async () => {
  //     // const data = await fetchGetId(query.get('token')!);
  //   }
  //   f();
  // }, [data])

  return (
    <>
      <div>ユーザー情報を照合しています</div>
      {data && <Link to='calendar'></Link>}
    </>
  );
};
