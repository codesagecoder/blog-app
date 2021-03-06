import axios from "axios";

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
    await userRequest().post("/upload", data);
    return filename
  } catch (err) {
    console.log(err);
  }
}