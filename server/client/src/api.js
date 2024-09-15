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

export const getUserChat = async (userId) => {
  try {
    console.log(userId);
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/chat/get-chat/${userId}`,
      {
        withCredentials: true,
      }
    );
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

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

export const getAnswer = async (question, githubLink, chatId) => {
  try {
    console.log(question, githubLink, chatId);
    console.log(chatId);
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/chat/code-correction/${chatId}`,
      {
        repoUrl: githubLink,
        issue: question,
      },
      {
        withCredentials: true,
      }
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//https://github.com/code-inhub/HackerMan

export const getFiles = async (githubLink) => {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/chat/getFileNames`,
      {
        repo_url: githubLink,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);

    return data?.fileNames?.fileNames;
  } catch (error) {
    throw error;
  }
};
export const createChat = async (githubLink, type) => {
  console.log(githubLink, type);

  try {
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/chat/create-chat`,
      {
        githubLink,
        type,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getChatAnalysis = async (chatId, githubLink) => {
  console.log(chatId);
  try {
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/chat/repo-analysis/${chatId}`,
      {
        repoUrl: githubLink,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};
