import axios from "axios";

const instance = axios.create({
  //baseURL: `http://localhost:8000/api/`,
  baseURL: `https://hidden-gem-api.herokuapp.com/api/`,
});

const getUserToken = () => {
  const savedUser = JSON.parse(localStorage.getItem("HiddenGemUser"));
  return savedUser ? savedUser.token : "";
};

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.common["Authorization"] = getUserToken();

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

instance.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    //Some error handling
    console.error(error.message);
    return Promise.reject(error);
  }
);

export default instance;
