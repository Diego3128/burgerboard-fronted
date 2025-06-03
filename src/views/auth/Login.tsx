import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import FormErrorMessages from "../../components/FormErrorMessages";
import SubmitButton from "../../components/SubmitButton";
import { useAuth } from "../../hooks/auth/useAuth";

// TODO: MOVE TO TYPES FOLDER 
export type LoginType = {
  email: string,
  password: string,
}
export type LoginErrorsType = {
  email?: string[],
  password?: string[],
}

export const Login = () => {
  // problem when using a custom hook:
  // every time Login redners useAuth is executed.
  // solutions? use zustand and create an authentication store?
  const { login, loading } = useAuth("guest", "/");

  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<LoginErrorsType>({});
  const [generalError, setGeneralError] = useState<null | string>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(formData, setFormData, setGeneralError, setFormErrors);
  }

  return (
    <div>
      <h2 className="text-center font-bold text-gray-700 text-2xl mb-10">
        Log in
      </h2>
      <p className="text-center text-gray-700 font-semibold sm:text-xl mb-8">
        To place an order you first need to log in.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className=" max-w-xl mx-auto md:mx-0 md:w-sm rounded-lg border-2 p-5 border-gray-300 mb-20 md:mb-0 space-y-5"
        action=""
      >
        {generalError && (
          <p className="animate-popIn bg-red-200 text-red-600 p-3 text-lg mb-6 rounded-lg text-center">{generalError}</p>
        )}

        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            value={formData.email}
            id="email"
            name="email"
            placeholder="Your email"
            className="w-full p-2.5 text-gray-700 font-semibold rounded-lg border border-gray-300 outline-none focus:border-gray-500 "
            type="email"
          />
          {/* errors */}
          <FormErrorMessages errors={formErrors.email} />
        </div>
        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={handleChange}
            value={formData.password}
            id="password"
            name="password"
            placeholder="Create a password"
            className="w-full p-2.5 text-gray-700 font-semibold rounded-lg border border-gray-300 outline-none focus:border-gray-500 "
            type="password"
          />
          {/* errors */}
          <FormErrorMessages errors={formErrors.password} />
        </div>

        <SubmitButton loading={loading} loadingText="Logging in...">
          Log in
        </SubmitButton>

        <nav>
          <p className="text-center text-pretty text-gray-700 font-semibold">
            Don't you have an account?{" "}
            <Link to={"/auth/register"} className="text-indigo-700">
              Create a new account
            </Link>
            .
          </p>
        </nav>
      </form>
    </div>
  );
};
