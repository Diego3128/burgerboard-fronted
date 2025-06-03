import useSWR from "swr";

import { parse, safeParse } from "valibot";
import { axiosClient } from "../../config/axios";
import {
  LoginUserErrorSchema,
  LoginUserSuccessSchema,
  UserResponseSchema,
} from "../../schemas";
import type { LoginErrorsType, LoginType } from "../../views/auth/Login";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import type { User } from "../../types";
import { useNavigate } from "react-router-dom";

export const useAuth = (middleware: string, url: string) => {
  const navigate = useNavigate();

  // fetcher function to get a user
  const fetcher = async (): Promise<User> => {
    const token = localStorage.getItem("AUTH-TOKEN");
    if (!token) {
      throw new Error("No auth-token available");
    }
    const response = await axiosClient("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // validate user data with valibot
    const user = parse(UserResponseSchema, response.data);
    return user;
  };
  // get possible auth user with useSWR
  const { data: user, error, mutate } = useSWR("/api/user", fetcher);
  console.log(user);
  console.log(error);

  // checks if there is a valid user
  useEffect(() => {
    // if there is a valid user available redirect to '/'
    if (middleware === "guest" && url && user) {
      navigate("/");
    }
  }, [user, middleware, navigate, url]);

  const [loading, setLoading] = useState(false);

  const login = async (
    formData: LoginType,
    setFormData: (fomData: LoginType) => void,
    setGeneralError: (error: null | string) => void,
    setFormErrors: (errors: LoginErrorsType) => void
  ) => {
    try {
      setLoading(true);
      setGeneralError(null);
      setFormErrors({});
      const response = await axiosClient.post(
        "/api/login",
        JSON.stringify(formData)
      );
      // validate reponse with valibot
      const result = parse(LoginUserSuccessSchema, response.data);
      if (result.success) {
        // save token
        const token = result.token;
        localStorage.setItem("AUTH-TOKEN", token);
        // call useSWR to fetch the user with the new token
        mutate();
      }
    } catch (error) {
      // validate errors
      if (error instanceof AxiosError) {
        // validate field errors
        const errorParse = safeParse(
          LoginUserErrorSchema,
          error.response?.data
        );
        if (errorParse.success) {
          return setFormErrors(errorParse.output.errors);
        }
        // 401 error
        if (error.response?.status === 401) {
          setGeneralError(
            "Wrong credendials. Make sure to use the right email and password."
          );
          // refresh password
          setFormData({ ...formData, password: "" });
        }
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};
