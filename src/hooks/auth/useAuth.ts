import useSWR from "swr";

import { parse, safeParse } from "valibot";
import { axiosClient } from "../../config/axios";
import {
  LoginUserErrorSchema,
  LoginUserSuccessSchema,
  RegisterUserErrorSchema,
  RegisterUserSuccessSchema,
  UserResponseSchema,
} from "../../schemas";
import type { LoginErrorsType, LoginType } from "../../views/auth/Login";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import type { User } from "../../types";
import { useNavigate } from "react-router-dom";
import type {
  RegisterErrorsType,
  RegisterType,
} from "../../views/auth/Register";

export const useAuth = (middleware: "auth" | "guest", url: string) => {
  const navigate = useNavigate();
  // fetcher function to get a user
  const fetcher = async (): Promise<User | undefined> => {
    try {
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
    } catch (error) {
      if (error instanceof AxiosError) {
        // delete current token if invalid
        if (error.response?.status === 401) {
          localStorage.removeItem("AUTH-TOKEN");
          navigate("/auth/login");
        }
      }
      throw new Error((error as Error).message);
    }
  };
  // get possible auth user with useSWR
  const { data: user, error, mutate } = useSWR("/api/user", fetcher);
  console.log(error);
  // checks if there is a valid user
  useEffect(() => {
    // redirect a user dependig  on the middlewarw given
    if (middleware === "guest" && url && user) {
      navigate(url);
    }

    if (middleware === "auth" && url && !user && error) {
      navigate(url);
    }
  }, [user, middleware, navigate, url, error]);

  const [loading, setLoading] = useState(false);

  const register = async (
    formData: RegisterType,
    setFormData: (fomData: RegisterType) => void,
    setFormErrors: (errors: RegisterErrorsType) => void
  ) => {
    try {
      setLoading(true);
      const response = await axiosClient.post(
        "/api/register",
        JSON.stringify(formData)
      );
      // validate reponse with valibot
      const result = parse(RegisterUserSuccessSchema, response.data);
      if (result.success) {
        const token = result.token;
        localStorage.setItem("AUTH-TOKEN", token);
        // call useSWR to fetch the user with the new token
        mutate();
      }
    } catch (error) {
      // validate erroros
      if (error instanceof AxiosError) {
        const errorParse = safeParse(
          RegisterUserErrorSchema,
          error.response?.data
        );
        if (errorParse.success) {
          setFormErrors(errorParse.output.errors);
          setFormData({ ...formData, password: "", password_confirmation: "" });
        }
      }
    } finally {
      setLoading(false);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("AUTH-TOKEN");
      await axiosClient("/api/logout", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("AUTH-TOKEN");
      await mutate(undefined);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    user,
    error,
    logout,
  };
};
