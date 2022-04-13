import useSWR from "swr";
import fetcher from "./fetcher";

import { Task } from "../types/types";

export const useGetTasks = () => {
  const { data, error } = useSWR(["/tasks", "GET"], fetcher);

  const tasks: Task[] = data.data;

  return {
    tasks,
    isLoading: !data && !error,
    isError: error,
  };
};
