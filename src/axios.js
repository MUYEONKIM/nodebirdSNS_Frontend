import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { tokenState } from "./store";

const baseURL = "http://localhost:8001";



export const useAxios = () => {
  const [token, setToken] = useRecoilState(tokenState)

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: token },
    withCredentials: true
  }); // 중요! Bearer 인증 방식을 알려주기 위해 'Bearer Token'형식으로 보내줘야합니다.

  // axiosInstance.interceptors.request.use(async req => {
  //   const user = jwt_decode(authTokens.access);
  //   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // 토큰만료 상태 체크

  //   if (!isExpired) return req; // 만료 안되면 access토큰 사용

  //   const response = await axios.post(`${baseURL}/token/refresh/`, {
  //     refresh: authTokens.refresh
  //   }); // 만료 되었을 경우 refresh토큰을 사용해서 access 토큰 재발급

  //   localStorage.setItem("authTokens", JSON.stringify(response.data));

  //   setAuthTokens(response.data);
  //   setUser(jwt_decode(response.data.access));

  //   req.headers.Authorization = `Bearer ${response.data.access}`;
  //   return req;
  // });

  return axiosInstance;
};