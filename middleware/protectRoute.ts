import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiResponse } from "next";
import fs from "fs";

import { User, NextApiRequestWithUser } from "../types/types";

const protectRoute = (handler: NextApiHandler) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const { TODO_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      const { id }: any = jwt.verify(token, "hello");

      if (!id) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid token",
        });
      }

      const usersData = fs.readFileSync("database/users.json", "utf-8");
      const users = JSON.parse(usersData);

      const user = users.find((u: User) => u.id === id);

      if (!user) {
        return res.status(401).json({
          status: "fail",
          message: "Not a valid user.",
        });
      }

      req.user = user;

      return handler(req, res);
    }

    return res.status(401).json({
      status: "fail",
      message: `You don't have access to this route.`,
    });
  };
};

export default protectRoute;
