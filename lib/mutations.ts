import fetcher from "./fetcher";

export const login = (body: { email: String; password: String }) => {
  return fetcher("signin", "POST", body);
};
