import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthQuery } from "../../resources/queries";
import { useAuthContext } from "../../hooks/useContextFamily";
import { Auth } from "../../lib/TimelineType";

export const AuthLeavePage = () => {
  const authContext = useAuthContext();  
  const tokenContext = authContext.type === 'token' ? authContext.accessToken : undefined;  

  // console.log(`Token: ${authContext.accessToken}`);
  const { data, isError, isPending } = useAuthQuery(tokenContext!);
  const navigate = useNavigate();

  console.log(`とりあえず結果のID: ${JSON.stringify(data)}`);
  console.log(`とりあえず結果のerr: ${isError}`);

  useEffect(() => {
    const f = async () => {
      data && navigate(`/calendar?userID=${data}`);
    }
    f();
  }, [data]);

  return (
    <>
      {isPending && <div>ユーザー情報を照合しています
        <p>だいぶお待ちください</p>
      </div>}
        {/* {data && <Link to='calendar'></Link>} */}
    </>
  );
};
