import type { NextPage } from "next";
import { useGetTasks } from "../lib/hooks";

import Task from "../components/Task";

const Home: NextPage = () => {
  const { tasks } = useGetTasks();

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-500 to-purple-800">
      <div className="container max-w-2xl mx-auto p-12">
        <h1 className="text-4xl font-bold mb-8 text-white">My Todos</h1>
        <div className="p-12 bg-white rounded shadow-2xl">
          <form className="mb-8">
            <input
              className="block w-full py-3 px-4 rounded border-2 border-gray-500 focus:border-purple-500 focus:ring-purple-500 focus:outline-none text-gray-700"
              placeholder="Enter something to do"
              id="task"
              name="task"
              type="text"
            />
            <div className="text-right">
              <button
                className="inline-block mt-4 px-8 py-3 bg-purple-500 hover:bg-purple-400 transition duration-300 rounded text-white"
                type="submit"
              >
                Add a todo
              </button>
            </div>
          </form>
          <div className="space-y-4">
            {tasks?.map((task) => {
              return <Task key={task.id} task={task} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
