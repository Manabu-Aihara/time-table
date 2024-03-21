import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { useAuthAxios } from '../../hooks/useAuthToken';

export const AuthTestPage = () => {
  const [value, setValue] = useState();
  const authAxios = useAuthAxios();

  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await authAxios.get('http://127.0.0.1:8000/event/all');
        setValue(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [render]);

  return (
    <>
      <div>トークンのページ
        <p>{value}</p>
      </div>
      <button onClick={() => setRender(true)}>Yes</button>
      <button>
        <Link to="/calendar">カレンダー</Link>
      </button>
    </>
  );
};
