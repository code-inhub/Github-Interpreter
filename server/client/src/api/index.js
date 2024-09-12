import axios from "axios";

export const getUser = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/v1/auth/verify-token",
    {
      withCredentials: true,
    }
  );

  return response;
};
