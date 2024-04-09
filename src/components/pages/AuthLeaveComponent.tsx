import { useEffect, Suspense } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuthQuery } from "../../resources/queries";
import { fetchGetId } from "../../hooks/useFetch";

export const AuthLeavePage = () => {

  const { data, isError, isLoading } = useAuthQuery();
  const navigate = useNavigate();

  console.log(`とりあえず結果のID: ${JSON.stringify(data)}`);
  console.log(`とりあえず結果のerr: ${isError}`);
  // setValue(data!);
  useEffect(() => {
    const f = async () => {
      data && navigate(`/calendar?userID=${data}`);
    }
    f();
  }, [data])

  return (
    <>
      <Suspense fallback={<div>ユーザー情報を照合しています</div>}>
        {/* {data && <Link to='calendar'></Link>} */}
      </Suspense>
    </>
  );
};
