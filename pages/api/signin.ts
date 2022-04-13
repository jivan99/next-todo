import cookie from "cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type User = {
  id: string;
  email: string;
  password: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: "error",
        message: "Password is required.",
      });
    }

    const usersData = fs.readFileSync("database/users.json", "utf-8");
    const users = JSON.parse(usersData);

    const user = users.find((u: User) => u.email === email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User doesn't exist.",
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now(),
        },
        "hello",
        {
          expiresIn: "8h",
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("TODO_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
  }
};

export default handler;
