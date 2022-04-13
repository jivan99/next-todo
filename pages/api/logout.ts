import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      status: "fail",
      message: "Only POST Request is allowed!",
    });
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("TODO_ACCESS_TOKEN", "", {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.status(200).json({
    status: "success",
    data: {},
  });
};

export default handler;
