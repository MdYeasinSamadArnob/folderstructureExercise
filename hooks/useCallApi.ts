import axios from "axios";
import { useState } from "react";

type requestType = "get" | "post" | "delete" | "patch";
type reqDataType<T> = {
  url: string;
  method?: requestType;
  payload?: [] | Record<string, unknown>;
  cb?: (res: T | Record<string, unknown>) => void;
};
const useCallApi = <T>() => {
  const [response, setResponse] = useState<T | Record<string, unknown>>(
    {} as T
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const makeApiRequest = ({ url, method, payload, cb }: reqDataType<T>) => {
    setIsLoading(true);
    axios({
      method: method ? method : "get",
      url: url,
      data: payload && payload,
    })
      .then((res) => {
        setResponse(res?.data as T);
        cb?.(res?.data as T);
        setIsLoading(false);
      })
      .catch((err) => {
        setResponse({} as T);
        setError(err as string);
      });
  };
  return [response, makeApiRequest, isLoading, setResponse, error] as const;
};
export default useCallApi;
