import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import type { UserActionData } from "~/routes/user";

const UseUserAuth = () => {
  const fetcher = useFetcher<UserActionData>();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const access_token = localStorage.getItem("access_token");
      const expires_in = localStorage.getItem("expires_in");
      const refresh_token = localStorage.getItem("refresh_token");

      fetcher.submit(
        {
          access_token: access_token ? access_token : "",
          expires_in: expires_in ? expires_in : "",
          refresh_token: refresh_token ? refresh_token : "",
        },
        {
          method: "post",
          action: "/user",
        }
      );
    }
  }, [fetcher]);

  return {
    fetcher,
  };
};

export default UseUserAuth;
