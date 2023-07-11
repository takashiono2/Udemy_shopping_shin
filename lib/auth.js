import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

//axiosを使ってpostする。
export const registerUser = (username, email, password) =>{
  return new Promise((resolve,reject) => {
    axios.post(
      `${API_URL}/auth/local/register`,{username, email, password}
    )
    .then((res)=>{
      Cookie.set("token",res.data.jwt,{ expires: 7});
      resolve(res);
    })
    .catch((err)=>{
      reject(err);
      console.log(err);
    });
  })
};

//axiosを使ってpostする。
export const login = (identifier, password) => {
  return new Promise((resolve,reject) => {
    axios.post(`${API_URL}/auth/local`,{
      identifier,
      password,
    })
    .then((res)=>{
      Cookies.set("token", res.data.jwt, { expires: 7 });
      resolve(res);
    })
    .catch((err)=>{
      reject(err);
      console.log(err);
    }
  );
  })
};
