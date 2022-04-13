import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type User = {
  id: string;
  email: string;
  password: string;
};

type NextApiRequestWithUser = NextApiRequest & {
  user?: User;
};
