import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import { v4 as uuidv4 } from "uuid";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const tasksData = fs.readFileSync("database/tasks.json", "utf-8");
  const tasks = JSON.parse(tasksData);

  // ⭐️ GET ALL TASKS ⭐️ //
  if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: tasks,
    });
  }

  // ⭐️ CREATE NEW TASK ⭐️ //
  if (req.method === "POST") {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        status: "error",
        message: "Description is required!",
      });
    }

    const newTask = {
      id: uuidv4(),
      description,
      completed: false,
    };

    const newTasks = [...tasks, newTask];
    const newTasksData = JSON.stringify(newTasks);

    fs.writeFileSync("database/tasks.json", newTasksData);

    res.status(201).json({
      status: "success",
      data: newTask,
    });
  }
};

export default handler;
