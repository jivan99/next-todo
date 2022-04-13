import type { NextPage } from "next";

const custom404: NextPage = () => {
  return (
    <div className="min-h-screen container mx-auto px-12 flex items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold mb-8">404 - Page not found!</h1>
      </div>
    </div>
  );
};

export default custom404;
