import axios from "axios";
import { userData } from "../components/MyAccPage";
import { LoginSchemaType, User } from "../schema/user";
import setAuthHeader from "../utility/setAuthHeader";

interface LoginService {
  // all database Login
  login(loginData: LoginSchemaType): Promise<User>;
  logout(): Promise<void>;
  updateMyAcc(data: userData): Promise<void>;
}

class LoginAPI implements LoginService {
  ENDPOINT = process.env.REACT_APP_ENDPOINT;

  login(loginData: LoginSchemaType): Promise<User> {
    return axios.post(`${this.ENDPOINT}/login/`, loginData).then((res) => {
      localStorage.setItem("AUTH_TOKEN", res.data.data.token.access_token);
      setAuthHeader(res.data.data.token.access_token);

      // set user data
      localStorage.setItem(
        "USER_INFO",
        JSON.stringify({
          id: res.data.data.id,
          first_name: res.data.data.first_name,
          last_name: res.data.data.last_name,
          email: res.data.data.email,
          role_id: res.data.data.role_id,
        })
      );
      return res.data as Promise<User>;
    });
  }

  logout(): Promise<void> {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("USER_INFO");
    return axios.get(`${this.ENDPOINT}/logout/`);
  }

  updateMyAcc(data: userData): Promise<void> {
    return axios.put(`${this.ENDPOINT}/my/acc/${data.id}/`, data)
  }
}

function getLoginAPI() {
  return new LoginAPI();
}

export default getLoginAPI;
