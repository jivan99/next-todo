import type { NextPage } from "next";

import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import fetcher from "../lib/fetcher";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetcher("/tasks", "GET").then((res) => {
      setTodos(res.data);
    });
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-purple-500 to-purple-800">
      <div className="container max-w-2xl mx-auto pt-32">
        <div className="p-12 bg-white rounded shadow-2xl">
          <TaskForm fetchTodos={fetchTodos} />
          <div className="space-y-4">
            {todos?.map((task) => {
              return <Task key={task.id} task={task} fetchTodos={fetchTodos} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
