import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { useAuthAxios } from '../../hooks/useAuthToken';
import basicAxios from "../../lib/AuthInfo";

export const AuthTestPage = () => {
  const [value, setValue] = useState();
  const authAxios = useAuthAxios();

  // const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await authAxios.get('/event/all');
      setValue(response.data);
    }
    getUsers();
  }, []);

  return (
    <>
      <div>トークンのページ
        <p>{value}</p>
      </div>
      {/* <button onClick={() => setRender(true)}>Yes</button> */}
      <button>
        <Link to="/calendar">カレンダー</Link>
      </button>
    </>
  );
};
