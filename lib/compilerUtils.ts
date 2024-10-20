import axios from "axios";
import { Language } from "@/types/language";

export const handleCompile = async (
  language: Language,
  code: string,
  customInput: string
) => {
  const formData = {
    language_id: language.id,
    source_code: btoa(code),
    stdin: btoa(customInput),
  };
  const options = {
    method: "POST",
    url: process.env.NEXT_PUBLIC_RAPIDAPI_URL,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
    data: formData,
  };

  try {
    const response = await axios.request(options);
    const token = response.data.token;
    return token;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const error = err.response ? err.response.data : err;
    const status = err.response?.status;
    if (status === 429) {
    }
    throw error;
  }
};

export const checkStatus = async (token: string): Promise<object> => {
  const options = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_RAPIDAPI_URL}/${token}`,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
  };
  try {
    const response = await axios.request(options);
    const statusId = response.data.status?.id;

    if (statusId === 1 || statusId === 2) {
      // still processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return checkStatus(token);
    } else {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};
