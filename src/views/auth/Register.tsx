import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import FormErrorMessages from "../../components/FormErrorMessages";
import SubmitButton from "../../components/SubmitButton";
import { useAuth } from "../../hooks/auth/useAuth";

// TODO MOVE TO TYPES FOLDER 
export type RegisterType = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}
export type RegisterErrorsType = {
  name?: string[],
  email?: string[],
  password?: string[],
}
export const Register = () => {
  const { loading, register } = useAuth("guest", "/");
  const [formData, setFormData] = useState<RegisterType>({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [formErrors, setFormErrors] = useState<RegisterErrorsType>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register(formData, setFormData, setFormErrors);
  }

  return (
    <div>
      <h2 className="text-center font-bold text-gray-700 text-2xl mb-10">
        Create a new account
      </h2>
      <p className="text-center text-gray-700 font-semibold sm:text-xl mb-8">
        Fill the following form to create a new account.
      </p>
      <form
        className=" max-w-xl mx-auto md:mx-0 md:w-sm rounded-lg border-2 p-5 border-gray-300 space-y-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            onChange={handleChange}
            value={formData.name}
            id="name"
            name="name"
            placeholder="Your name"
            type="text"
            className="w-full p-2.5 text-gray-700 font-semibold rounded-lg border border-gray-300 outline-none focus:border-gray-500 "
          />
          <FormErrorMessages errors={formErrors.name} />

        </div>
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
        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="password_confirmation"
          >
            Repeat your password
          </label>
          <input
            onChange={handleChange}
            value={formData.password_confirmation}
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Repeat the password"
            className={`w-full p-2.5 text-gray-700 font-semibold rounded-lg border  outline-none focus:border-gray-500`}
            type="password"
          />
          {/* errors */}
          <FormErrorMessages errors={formErrors.password} />

        </div>

        <SubmitButton loading={loading} loadingText="Creating account...">
          Create account
        </SubmitButton>

        <nav>
          <p className="text-center text-pretty text-gray-700 font-semibold">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="text-indigo-700">
              Login
            </Link>
            .
          </p>
        </nav>
      </form>
    </div>
  );
};
