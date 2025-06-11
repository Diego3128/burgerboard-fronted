import { create } from "zustand";
import type {
  RegisterErrorsType,
  RegisterType,
} from "../../views/auth/Register";
import type { User } from "../../types";
import { devtools } from "zustand/middleware";
import { axiosClient } from "../../config/axios";
import { parse, safeParse } from "valibot";
import {
  LoginUserErrorSchema,
  LoginUserSuccessSchema,
  RegisterUserErrorSchema,
  RegisterUserSuccessSchema,
  UserResponseSchema,
} from "../../schemas";
import { AxiosError } from "axios";
import type { NavigateFunction } from "react-router-dom";
import type { LoginErrorsType, LoginType } from "../../views/auth/Login";
import type { Dispatch, SetStateAction } from "react";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  gettingUser: boolean;
  register: (
    formData: RegisterType,
    setFormData: Dispatch<SetStateAction<RegisterType>>,
    setFormErrors: Dispatch<SetStateAction<RegisterErrorsType>>,
    navigate: NavigateFunction
  ) => Promise<void>;
  getUser: () => Promise<void>; // executed in guard: src\views\guards\RequireAuth.tsx
  login: (
    formData: LoginType,
    setFormData: Dispatch<SetStateAction<LoginType>>,
    setFormErrors: Dispatch<SetStateAction<LoginErrorsType>>,
    navigate: NavigateFunction,
    setAuthError: Dispatch<SetStateAction<string | null>>
  ) => Promise<void>;
  logout: (navigate: NavigateFunction) => Promise<void>;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      gettingUser: true,
      //
      register: async (formData, setFormData, setFormErrors, navigate) => {
        try {
          set({ loading: true });
          const response = await axiosClient.post("/api/register", formData);
          // validate reponse with valibot
          const result = parse(RegisterUserSuccessSchema, response.data);
          if (result.success) {
            const token = result.token;
            const user = result.user;
            set((state) => ({ ...state, token, user }));
            localStorage.setItem("AUTH-TOKEN", token);
            // redirect with navigate
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          // validate form errors
          if (error instanceof AxiosError) {
            const errorParse = safeParse(
              RegisterUserErrorSchema,
              error.response?.data
            );
            if (errorParse.success) {
              setFormErrors(errorParse.output.errors);
              // reset password and password_confirmation fields
              setFormData({
                ...formData,
                password: "",
                password_confirmation: "",
              });
            }
          }
        } finally {
          set({ loading: false });
        }
      },
      //
      getUser: async () => {
        // fetch user
        try {
          const token = get().token || localStorage.getItem("AUTH-TOKEN");
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
          //   set user and token
          set((state) => ({ ...state, user, token }));
        } catch (error) {
          console.error(error);
          localStorage.removeItem("AUTH-TOKEN");
          set((state) => ({ ...state, user: null, token: null }));
        } finally {
          set((state) => ({ ...state, gettingUser: false }));
        }
      },
      login: async (
        formData,
        setFormData,
        setFormErrors,
        navigate,
        setAuthError
      ) => {
        try {
          set((state) => ({ ...state, loading: true }));
          setAuthError(null);
          setFormErrors({});
          const response = await axiosClient.post("/api/login", formData);
          // validate reponse with valibot
          const result = parse(LoginUserSuccessSchema, response.data);
          if (result.success) {
            // save token
            const token = result.token;
            const user = result.user;
            localStorage.setItem("AUTH-TOKEN", token);
            set((state) => ({ ...state, token, user }));
            navigate("/");
          }
        } catch (error) {
          console.log(error);
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
            if (error.response?.status === 401) {
              setAuthError(
                "Wrong credentials. Make sure to use the right email and password."
              );
            }
          }
        } finally {
          // refresh password
          setFormData({ ...formData, password: "" });
          set((state) => ({ ...state, loading: false }));
        }
      },
      logout: async (navigate) => {
        try {
          const token = get().token || localStorage.getItem("AUTH-TOKEN");
          if (!token) {
            throw new Error("No token found. Forcing logout...");
          }
          set((state) => ({ ...state, loading: true }));
          await axiosClient("/api/logout", {
            method: "post",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error(error);
        } finally {
          localStorage.removeItem("AUTH-TOKEN");
          set((state) => ({
            ...state,
            loading: false,
            user: null,
            token: null,
          }));
          setTimeout(() => {
            navigate("/");
          }, 300);
        }
      },
      reset: () => {
        localStorage.removeItem("AUTH-TOKEN");
        // set defaults
        set(() => ({
          user: null,
          token: null,
          loading: false,
          gettingUser: true,
        }));
      },
    }),
    {
      name: "burgerboard-auth",
    }
  )
);
