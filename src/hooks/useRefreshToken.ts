import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthParent";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    // cookieに保存されたrefresh_tokenを送付してaccess_tokenを取得する
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      // access_tokenを保持する
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;