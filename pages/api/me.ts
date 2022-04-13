import fs from "fs";
import { NextApiHandler, NextApiResponse } from "next";

import protectRoute from "../../middleware/protectRoute";
import { NextApiRequestWithUser, User } from "../../types/types";

const handler: NextApiHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(400).json({
      status: "error",
      message: "Only GET & PATCH is allowed!",
    });
  }

  const { user } = req;

  if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: user,
    });
  }

  if (req.method === "PATCH") {
    const usersData = fs.readFileSync("database/users.json", "utf-8");
    const users = JSON.parse(usersData);

    const userToUpdate = users.find((u: User) => u.id === user?.id);
    const { firstName, lastName } = req.body;

    if (firstName) {
      userToUpdate.firstName = firstName;
    }

    if (lastName) {
      userToUpdate.lastName = lastName;
    }

    const updatedUsersData = JSON.stringify(users);
    fs.writeFileSync("database/users.json", updatedUsersData);

    res.status(200).json({
      status: "success",
      data: userToUpdate,
    });
  }
};

export default protectRoute(handler);
