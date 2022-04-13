import type { NextPage } from "next";
import { useRouter } from "next/router";
import { login } from "../lib/mutations";
import { ChangeEvent, FormEventHandler, useState } from "react";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler = async (e: ChangeEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await login({ email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen text-gray-700 bg-purple-700 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl p-10 bg-white shadow-2xl rounded space-y-8"
      >
        <div>
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="block py-3 px-4 border-2 border-gray-600 rounded focus:border-purple-600 focus:ring-purple-600 outline-none"
            name="email"
            id="email"
            placeholder="Enter your email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="block py-3 px-4 border-2 border-gray-600 rounded focus:border-purple-600 focus:ring-purple-600 outline-none"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="block w-full py-3 text-center uppercase text-white rounded bg-purple-700 hover:bg-purple-500 transition duration-300"
          type="submit"
          disabled={isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
