import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen container mx-auto px-12 flex items-center justify-center text-center">
      <div>
        <h1 className="text-6xl font-bold mb-8">
          <span className="block">Organize it all with</span>
          <span className="block">Todoify</span>
        </h1>
        <button
          onClick={() => {
            router.push("/todos");
          }}
          className="py-4 px-16 bg-purple-500 rounded-lg uppercase text-white text-2xl"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
