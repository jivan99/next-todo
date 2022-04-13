import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastname: string;
};

export type NextApiRequestWithUser = NextApiRequest & {
  user?: User;
};

export type Task = {
  id: string;
  description: string;
  completed: boolean;
};
