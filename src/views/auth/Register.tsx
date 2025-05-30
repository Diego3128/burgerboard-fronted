import { Link } from "react-router-dom";

export const Register = () => {
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
        action=""
      >
        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Your name"
            type="text"
            className="w-full p-2.5 text-gray-700 font-semibold rounded-lg border border-gray-300 outline-none focus:border-gray-500 "
          />
        </div>
        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Your email"
            className="w-full p-2.5 text-gray-700 font-semibold rounded-lg border border-gray-300 outline-none focus:border-gray-500 "
            type="email"
          />
        </div>
        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            placeholder="Create a password"
            className="w-full p-2.5 text-gray-700 font-semibold rounded-lg border border-gray-300 outline-none focus:border-gray-500 "
            type="password"
          />
        </div>
        <div>
          <label
            className="text-gray-700  block mb-3 font-semibold"
            htmlFor="password_confirmation"
          >
            Repeat your password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Repeat the password"
            className="w-full p-2.5 text-gray-700 font-semibold rounded-lg border border-gray-300 outline-none focus:border-gray-500 "
            type="password"
          />
        </div>

        <button
          className="bg-yellow-400 text-gray-900 rounded-xl p-5 text-center block w-full font-black mt-7 disabled:bg-yellow-300 hover:bg-yellow-300 focus:bg-yellow-300 outline-none cursor-pointer disabled:cursor-not-allowed"
          type="submit"
        >
          Create account
        </button>

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
