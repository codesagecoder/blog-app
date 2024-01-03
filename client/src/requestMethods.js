import axios from "axios";

// const BASE_URL = (process.env.REACT_APP_API_URL ?? '') + "/api/";
const BASE_URL = "/api/";


export function userRequest() {
  var TOKEN = localStorage.getItem("persist:root") ?
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)?.accessToken ?
      JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).accessToken :
      'NO_TOKEN' :
    'NO_TOKEN';

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      token: `Bearer ${TOKEN}`
    },
  });
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export async function fileUpload(file) {
  const data = new FormData();
  const filename = Date.now() + "_" + file.name;
  data.append("name", filename);
  data.append("file", file);
  try {
    const { data: { url } } = await userRequest().post("/upload", data);
    console.log({url});
    return url;
  } catch (err) {
    console.log(err);
  }
}