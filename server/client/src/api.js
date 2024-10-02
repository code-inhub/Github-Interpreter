import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";
//register
export const register = async (username, email, password) => {
  try {
    // console.log(username, email, password);
    const { data } = await axios.post(
      `${baseURL}/auth/register`,
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
    // console.log(response.data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/login`,
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

    return response;
  } catch (err) {}
};

export const logout = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/logout`, {
      withCredentials: true,
    });

    return response;
  } catch (err) {}
};

export const getUser = async () => {
  const { data } = await axios.get(`${baseURL}/auth/verify-token`, {
    withCredentials: true,
  });

  return data;
};

export const getUserChat = async (userId) => {
  try {
    const { data } = await axios.get(`${baseURL}/chat/get-chat/${userId}`, {
      withCredentials: true,
    });
    // console.log(data.data);
    return data.data;
  } catch (error) {
    // console.log(error);
  }
};

export const getToken = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/auth/verify-token`, {
      withCredentials: true,
    });

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
      `${baseURL}/chat/chat-Repo/${chatId}`,
      {
        userMessageContent: question,
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
    console.log(error);
  }
};

//https://github.com/code-inhub/HackerMan

export const getErrorMessages = async (githubLink, chatId, question) => {
  try {
    console.log("messages", githubLink, chatId, question);
    const { data } = await axios.post(
      `${baseURL}/chat/handle-error/${chatId}`,
      {
        errorDescription: question,
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

export const getFiles = async (githubLink) => {
  try {
    const { data } = await axios.post(
      `${baseURL}/chat/getFileNames`,
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
export const createChat = async (githubLink, type, selectedFiles) => {
  console.log(githubLink, type, selectedFiles);

  try {
    const { data } = await axios.post(
      `${baseURL}/chat/create-chat`,
      {
        type,
        githubLink,
        filesSelected: selectedFiles,
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

// src/api/chatAnalysis.js
export const getChatAnalysis = async (
  chatId,
  githubLink,
  onUpdate,
  onComplete,
  onError
) => {
  try {
    const response = await fetch(`${baseURL}/chat/repo-analysis/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl: githubLink }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;


      buffer += decoder.decode(value, { stream: true });

      // Split by newline and make sure we handle various line endings
      const lines = buffer.split(/\r?\n|\r|\n/);
      buffer = lines.pop(); // Save the last incomplete line

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.replace('data: ', '');

          if (data === '[DONE]') {
            onComplete();
            return;
          }

          if (data) {
            // Handle the chunk as markdown
            onUpdate(data);
          }
        }
      }
    }

    onComplete();
  } catch (err) {
    onError(err);
  }
};
};
