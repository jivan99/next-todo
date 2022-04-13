import Link from "next/link";
import { useRouter } from "next/router";
import { ReactChild } from "react";

type Props = {
  children: ReactChild;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <>
      <header className="bg-gray-900 fixed top-0 left-0 w-full text-gray-300">
        <div className="container py-6 px-28 mx-auto flex justify-between items-center">
          <div className="space-x-8">
            <Link href="/">
              <a
                className={
                  router.asPath === "/"
                    ? "font-bold underline text-gray-100"
                    : ""
                }
              >
                Home
              </a>
            </Link>
            <Link href="/todos">
              <a
                className={
                  router.asPath === "/todos"
                    ? "font-bold underline text-gray-100"
                    : ""
                }
              >
                My todos
              </a>
            </Link>
            <Link href="/me">
              <a
                className={
                  router.asPath === "/me"
                    ? "font-bold underline text-gray-100"
                    : ""
                }
              >
                My profile
              </a>
            </Link>
          </div>
          <button className="inline-block px-6 py-2 bg-yellow-500 text-yellow-900 rounded">
            Logout
          </button>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
