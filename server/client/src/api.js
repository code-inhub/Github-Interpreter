import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/auth";
//localhost:8080/api/v1/auth/register
export const register = async (userName, email, password) => {
  try {
    console.log(userName, email, password);
    const response = await axios.post(
      `${baseURL}/register`,
      {
        userName,
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

export const login = async (userName, email, password) => {
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

export const logout = async (userName, email, password) => {
  try {
    const response = await axios.post(
      `${baseURL}/logout`,
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
