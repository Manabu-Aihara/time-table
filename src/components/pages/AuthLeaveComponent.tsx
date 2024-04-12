import { useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuthQuery } from "../../resources/queries";

export const AuthLeavePage = () => {

  const { data, isError,isPending } = useAuthQuery();
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
      {isPending && <div>ユーザー情報を照合しています
        <p>だいぶお待ちください</p>
      </div>}
        {/* {data && <Link to='calendar'></Link>} */}
    </>
  );
};
