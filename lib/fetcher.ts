export default function fetcher(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  data: any = undefined
) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status < 200 && res.status > 299) {
      throw new Error();
    }
    return res.json();
  });
}
