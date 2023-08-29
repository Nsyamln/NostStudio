async function send(endpoint, method, body) {
  const response = await fetch(`http://localhost:3000/api${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
}

export const api = {
  get: (endpoint) => send(endpoint, "GET"),
  post: (endpoint, body) => send(endpoint, "POST", body),
  put: (endpoint, body) => send(endpoint, "PUT", body),
  delete: (endpoint) => send(endpoint, "DELETE"),
};
