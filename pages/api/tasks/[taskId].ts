import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

type Task = {
  id: string;
  description: string;
  completed: boolean;
};

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const tasksData = fs.readFileSync("database/tasks.json", "utf-8");
  let tasks = JSON.parse(tasksData);

  const { taskId } = req.query;

  const task = tasks.find((t: Task) => t.id === taskId);

  // ⭐️ Task NOT FOUND ⭐️ //
  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "No task found with that Id.",
    });
  }

  // ⭐️ GET REQUEST ⭐️ //
  if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: task,
    });
  }

  // ⭐️ PATCH REQUEST ⭐️ //
  if (req.method === "PATCH") {
    const { description, completed } = req.body;

    if (description) {
      task.description = description;
    }

    if (completed) {
      task.completed = completed;
    }

    const updatedTasksData = JSON.stringify(tasks);

    fs.writeFileSync("database/tasks.json", updatedTasksData);

    res.status(200).json({
      status: "success",
      data: task,
    });
  }

  // ⭐️ DELETE REQUEST ⭐️ //
  if (req.method === "DELETE") {
    tasks = tasks.filter((t: Task) => t.id !== task.id);
    fs.writeFileSync("database/tasks.json", JSON.stringify(tasks));

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
};

export default handler;
