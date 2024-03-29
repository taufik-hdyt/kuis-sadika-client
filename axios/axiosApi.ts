import axios from "axios";

const UserAPI = axios.create({
  baseURL: "http://cb7gtlh0-5001.asse.devtunnels.ms",
});






//===============================================

const postUserApi = axios.create({
  baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/user",
});
// const getUserApi = axios.create({
//   baseURL: "https://pqxqvp7z-5000.asse.devtunnels.ms/checkEmail/",
// });
const getUserApi = axios.create({
  baseURL: `http://192.168.18.3:3000/user`,
});

// server backend
// https://pqxqvp7z-5000.asse.devtunnels.ms/avatars
const avatarApi = axios.create({
  baseURL: "http://192.168.18.3:3000/avatars",
});

// dummy data npint
// https://pqxqvp7z-5000.asse.devtunnels.ms/questions backend
const questionsApi = axios.create({
  baseURL: "http://192.168.18.3:3000/questions",
});

export { postUserApi, getUserApi, avatarApi, questionsApi,UserAPI };
