import axios from "axios";

const setAuthHeader = (token: string | undefined) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthHeader;
