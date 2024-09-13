import axios from "axios";
import { get } from "mongoose";

const baseURL = "http://localhost:8080/api/v1/auth";
//localhost:8080/api/v1/auth/register
export const register = async (username, email, password) => {
  try {
    console.log(username, email, password);
    const { data } = await axios.post(
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
    const response = await axios.get(`${baseURL}/logout`, {
      withCredentials: true,
    });
    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  const { data } = await axios.get(
    "http://localhost:8080/api/v1/auth/verify-token",
    {
      withCredentials: true,
    }
  );

  return data;
};

export const getUserChat = async (userId) =>{
  const {data} = await axios.get(
    `http://localhost:8080/api/v1/get-chat/${userId}`,
    {
      withCredentials: true,
    }
  );
  return data.messages;
}

export const getToken = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/auth/verify-token`,
      {
        withCredentials: true,
      }
    );

    //console.log(token);

    if (data?.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    //console.log(error);
    return false;
  }
};

export const getAnswer = async (question,repoUrl,chatId) => {
  try {
    console.log(question,repoUrl,chatId);
    const {data}  = await axios.post(
      `http://localhost:8080/api/v1/chat/code-correction/66e2d60549b9bb63c1b428a9`,
      {
        repoUrl,
        issue:question,
      },
      {
        withCredentials: true,
      }
    );
    console.log(data);
    return data.aiMessage.text;
  } catch (error) {
    console.log(error);
  }
}
