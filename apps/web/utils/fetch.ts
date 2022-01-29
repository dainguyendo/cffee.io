export function get(url: string) {
  return fetch(url, { method: "GET" });
}

export function post<T>(url: string, body?: T, options?: RequestInit) {
  return fetch(url, {
    method: "POST",
    ...(body && { body: JSON.stringify(body) }),
    ...(options && options),
  });
}
