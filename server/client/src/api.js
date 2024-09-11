import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/auth";
//localhost:8080/api/v1/auth/register
export const register = async (username, email, password) => {
  try {
    console.log(username, email, password);
    const response = await axios.post(
      `${baseURL}/register`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${baseURL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${baseURL}/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);

    return response;
  } catch (err) { 
    console.log(err);
  } 
};
 