import cookie from "cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const salt = bcrypt.genSaltSync();

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

    const user = {
      id: uuidv4(),
      email,
      password: bcrypt.hashSync(password, salt),
    };

    const usersData = fs.readFileSync("database/users.json", "utf-8");
    const users = JSON.parse(usersData);

    const newUsers = [...users, user];
    const newUsersData = JSON.stringify(newUsers);

    fs.writeFileSync("database/users.json", newUsersData);

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      "hello",
      { expiresIn: "8h" }
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
  }
};

export default handler;
