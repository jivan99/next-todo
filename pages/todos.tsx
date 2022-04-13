import type { NextPage } from "next";
import { useGetTasks } from "../lib/hooks";

import Task from "../components/Task";
import TaskForm from "../components/TaskForm";

const Home: NextPage = () => {
  const { tasks } = useGetTasks();

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-500 to-purple-800">
      <div className="container max-w-2xl mx-auto p-12">
        <h1 className="text-4xl font-bold mb-8 text-white">My Todos</h1>
        <div className="p-12 bg-white rounded shadow-2xl">
          <TaskForm />
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
