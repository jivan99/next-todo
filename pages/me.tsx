import { NextPage } from "next";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import fetcher from "../lib/fetcher";

const Me: NextPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isProcessing, setIsprocessing] = useState(false);
  const [email, setEmail] = useState("");

  const fetchMe = () => {
    fetcher("/me", "GET").then((res) => {
      const { firstName, lastName, email } = res.data;
      if (firstName) {
        setFirstName(firstName);
      }

      if (lastName) {
        setLastName(lastName);
      }

      if (email) {
        setEmail(email);
      }
    });
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const handleSubmit: FormEventHandler = (e: ChangeEvent) => {
    e.preventDefault();

    setIsprocessing(true);
    fetcher("/me", "PATCH", { firstName, lastName })
      .then(() => {
        setIsprocessing(false);
      })
      .catch(() => {
        setIsprocessing(false);
      });
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-500 to-purple-800">
      <div className="container max-w-2xl mx-auto pt-32">
        <div className="p-16 bg-white rounded shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="block w-full py-3 px-4 rounded border-2 border-gray-500 focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="block w-full py-3 px-4 rounded border-2 border-gray-500 focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="block w-full py-3 px-4 rounded border-2 border-gray-500 disabled:border-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
                id="email"
                name="email"
                placeholder="Email"
                type="text"
                readOnly
                disabled
                value={email}
              />
            </div>
            <div className="pt-4">
              <button
                className="block w-full py-4 rounded-full text-center uppercase text-white bg-purple-700 hover:bg-purple-500 transition duration-300"
                type="submit"
                disabled={isProcessing}
              >
                Update Me
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Me;
